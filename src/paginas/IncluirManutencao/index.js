import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./style";
import api from "../../services/api";
import { formatInputDate } from "../../utils/formatters";

export default function IncluirManutencao({ navigation }) {
  const [equipamento, setEquipamento] = useState("");
  const [tipoManutencao, setTipoManutencao] = useState("");
  const [custo, setCusto] = useState("");
  const [dataManutencao, setDataManutencao] = useState("");
  const [foiConcluida, setFoiConcluida] = useState(false);

  const formatInputToCurrency = (text) => {
    const cleaned = text.replace(/[^\d]/g, "");
    const numericValue = parseFloat(cleaned) / 100;
    return numericValue.toFixed(2).replace(".", ",");
  };

  const incluirManutencao = async () => {
    if (!equipamento || !tipoManutencao || !custo || !dataManutencao) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const [dia, mes, ano] = dataManutencao.split("/");
      const dataISO = `${ano}-${mes}-${dia}`;

      await api.post("/manutencao/adicionar", {
        equipamento,
        tipoManutencao,
        custo: parseFloat(custo.replace(",", ".")),
        dataManutencao: dataISO,
        foiConcluida,
      });

      Alert.alert("Sucesso", "Manutenção adicionada com sucesso!");
      navigation.navigate("ListarManutencao");
    } catch (error) {
      console.log("Erro ao adicionar:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível salvar a manutenção.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Nova Manutenção</Text>

          <Text style={styles.label}>Equipamento</Text>
          <TextInput
            style={styles.input}
            value={equipamento}
            onChangeText={setEquipamento}
            placeholder="Ex: Notebook Dell"
          />

          <Text style={styles.label}>Tipo de Manutenção</Text>
          <TextInput
            style={styles.input}
            value={tipoManutencao}
            onChangeText={setTipoManutencao}
            placeholder="Ex: Troca de HD"
          />

          <Text style={styles.label}>Custo (R$)</Text>
          <TextInput
            style={styles.input}
            value={custo}
            onChangeText={(text) => setCusto(formatInputToCurrency(text))}
            keyboardType="numeric"
            placeholder="Ex: 250,00"
          />

          <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
          <TextInput
            style={styles.input}
            value={dataManutencao}
            onChangeText={(text) => setDataManutencao(formatInputDate(text))}
            keyboardType="numeric"
            placeholder="Ex: 25/06/2025"
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Concluída?</Text>
            <Switch value={foiConcluida} onValueChange={setFoiConcluida} />
          </View>

          <TouchableOpacity style={styles.button} onPress={incluirManutencao}>
            <Text style={styles.buttonText}>Salvar Manutenção</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
