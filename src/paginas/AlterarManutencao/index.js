// src/paginas/AlterarManutencao/index.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, Alert } from "react-native";
import style from "./style";
import api from "../../services/api";

export default function AlterarManutencao({ navigation, route }) {
  const { id, equipamento: eq, tipoManutencao: tipo, custo: cs, dataManutencao: dt, foiConcluida: fc } = route.params;

  const [equipamento, setEquipamento] = useState(eq);
  const [tipoManutencao, setTipoManutencao] = useState(tipo);
  const [custo, setCusto] = useState(String(cs));
  const [dataManutencao, setDataManutencao] = useState(dt);
  const [foiConcluida, setFoiConcluida] = useState(fc);

  const alterarManutencao = async () => {
    if (!equipamento || !tipoManutencao || !custo || !dataManutencao) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de salvar.");
      return;
    }

    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dataManutencao)) {
      Alert.alert("Data inválida", "Use o formato AAAA-MM-DD.");
      return;
    }

    try {
      await api.put(`/manutencao/atualizar/${id}`, {
        equipamento,
        tipoManutencao,
        custo: parseFloat(custo),
        dataManutencao,
        foiConcluida,
      });
      Alert.alert("Sucesso", "Manutenção atualizada com sucesso!");
      navigation.navigate("ListarManutencao");
    } catch (error) {
      console.log("Erro ao atualizar:", error.response?.data || error.message);
      Alert.alert("Erro ao alterar", "Não foi possível atualizar a manutenção.");
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Editar Manutenção</Text>

      <Text style={style.label}>Equipamento</Text>
      <TextInput style={style.input} value={equipamento} onChangeText={setEquipamento} />

      <Text style={style.label}>Tipo de Manutenção</Text>
      <TextInput style={style.input} value={tipoManutencao} onChangeText={setTipoManutencao} />

      <Text style={style.label}>Custo (R$)</Text>
      <TextInput style={style.input} value={custo} onChangeText={setCusto} keyboardType="numeric" />

      <Text style={style.label}>Data</Text>
      <TextInput style={style.input} value={dataManutencao} onChangeText={setDataManutencao} placeholder="AAAA-MM-DD" />

      <View style={style.switchContainer}>
        <Text style={style.label}>Concluída?</Text>
        <Switch value={foiConcluida} onValueChange={setFoiConcluida} />
      </View>

      <TouchableOpacity style={style.button} onPress={alterarManutencao}>
        <Text style={style.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
