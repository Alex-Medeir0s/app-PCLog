import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import style from "./style";
import api from "../../services/api";
import { formatCurrencyBRL, formatDateBR } from "../../utils/formatters";

export default function ListarManutencao({ navigation }) {
  const [manutencoes, setManutencoes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const carregarManutencoes = useCallback(() => {
    setRefreshing(true);
    api.get("/manutencao/listar")
      .then((res) => setManutencoes(res.data))
      .catch((error) => {
        console.log("Erro ao carregar:", error.response?.data || error.message);
        Alert.alert("Erro ao carregar", "Verifique sua conexão com o servidor");
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarManutencoes);
    return unsubscribe;
  }, [navigation]);

  const excluirManutencao = async (id) => {
    try {
      await api.delete(`/manutencao/remover/${id}`);
      carregarManutencoes();
    } catch (error) {
      console.log("Erro ao excluir:", error.response?.data || error.message);
      Alert.alert("Erro ao excluir", "Não foi possível excluir a manutenção");
    }
  };

 const renderItem = ({ item }) => (
  <TouchableOpacity
    style={style.card}
    onPress={() => navigation.navigate("AlterarManutencao", { ...item })}
  >
    <View style={{ flex: 1 }}>
      <Text style={style.cardTitle}>{item.equipamento}</Text>
      <Text style={style.cardSubtitle}>
        {item.tipoManutencao} - {formatCurrencyBRL(item.custo)}
      </Text>
      <Text style={style.cardSubtitle}>Cliente: {item.cliente}</Text>
      <Text style={style.cardDate}>{formatDateBR(item.dataManutencao)}</Text>
      <Text style={{ fontSize: 12, color: item.foiConcluida ? "green" : "red" }}>
        {item.foiConcluida ? "Concluída" : "Pendente"}
      </Text>
    </View>
    <TouchableOpacity onPress={() => excluirManutencao(item.id)}>
      <FontAwesome name="trash" size={24} color="#ff4d4d" />
    </TouchableOpacity>
  </TouchableOpacity>
);


  return (
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {manutencoes.length === 0 ? (
            <Text style={style.emptyText}>Nenhuma manutenção encontrada.</Text>
          ) : (
            <FlatList
              data={manutencoes}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={carregarManutencoes} />
              }
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </>
      )}

      <TouchableOpacity
        style={style.bottomButton}
        onPress={() => navigation.navigate("IncluirManutencao")}
      >
        <Text style={style.bottomButtonText}>Adicionar Manutenção</Text>
      </TouchableOpacity>
    </View>
  );
}
