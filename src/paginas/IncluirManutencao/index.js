import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, ScrollView } from "react-native";
import styles from "./style";
import api from "../../services/api";

export default function IncluirManutencao({ navigation }) {
  const [equipamento, setEquipamento] = useState("");
  const [tipoManutencao, setTipoManutencao] = useState("");
  const [custo, setCusto] = useState("");
  const [dataManutencao, setDataManutencao] = useState("");
  const [foiConcluida, setFoiConcluida] = useState(false);

  const incluirManutencao = async () => {
    if (!equipamento || !tipoManutencao || !custo || !dataManutencao) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      await api.post("/adicionar", {
        equipamento,
        tipoManutencao,
        custo: parseFloat(custo),
        dataManutencao,
        foiConcluida,
      });

      Alert.alert("Sucesso", "Manutenção adicionada com sucesso!");
      navigation.navigate("ListarManutencao");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a manutenção.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Manutenção</Text>

      <Text style={styles.label}>Equipamento</Text>
      <TextInput style={styles.input} value={equipamento} onChangeText={setEquipamento} placeholder="Ex: Notebook Dell" />

      <Text style={styles.label}>Tipo de Manutenção</Text>
      <TextInput style={styles.input} value={tipoManutencao} onChangeText={setTipoManutencao} placeholder="Ex: Troca de HD" />

      <Text style={styles.label}>Custo (R$)</Text>
      <TextInput style={styles.input} value={custo} onChangeText={setCusto} keyboardType="numeric" placeholder="Ex: 250.00" />

      <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
      <TextInput style={styles.input} value={dataManutencao} onChangeText={setDataManutencao} placeholder="Ex: 2025-06-25" />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Concluída?</Text>
        <Switch value={foiConcluida} onValueChange={setFoiConcluida} />
      </View>

      <TouchableOpacity style={styles.button} onPress={incluirManutencao}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
