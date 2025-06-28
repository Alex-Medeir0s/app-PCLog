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
  const [cliente, setCliente] = useState("");
  const [custo, setCusto] = useState("");
  const [dataManutencao, setDataManutencao] = useState("");
  const [foiConcluida, setFoiConcluida] = useState(false);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  const formatInputToCurrency = (text) => {
    const cleaned = text.replace(/[^\d]/g, "");
    const numericValue = parseFloat(cleaned) / 100;
    return numericValue.toFixed(2).replace(".", ",");
  };

  const buscarEnderecoPorCep = async (valor) => {
    const cepLimpo = valor.replace(/\D/g, "");
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        } else {
          setEndereco("CEP não encontrado");
        }
      } catch (error) {
        setEndereco("Erro ao buscar endereço");
      }
    } else {
      setEndereco("");
    }
  };

  const incluirManutencao = async () => {
    if (!equipamento || !tipoManutencao || !cliente || !custo || !dataManutencao) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const [dia, mes, ano] = dataManutencao.split("/");
      const dataISO = `${ano}-${mes}-${dia}`;

      await api.post("/manutencao/adicionar", {
        equipamento,
        tipoManutencao,
        cliente,
        custo: parseFloat(custo.replace(",", ".")),
        dataManutencao: dataISO,
        foiConcluida,
        cep,
        endereco,
      });

      Alert.alert("Sucesso", "Manutenção adicionada com sucesso!");
      navigation.navigate("ListarManutencao");
    } catch (error) {
      console.log("Erro ao adicionar:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível salvar a manutenção.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Nova Manutenção</Text>

          <Text style={styles.label}>Equipamento</Text>
          <TextInput style={styles.input} value={equipamento} onChangeText={setEquipamento} placeholder="Ex: Notebook Dell" />

          <Text style={styles.label}>Tipo de Manutenção</Text>
          <TextInput style={styles.input} value={tipoManutencao} onChangeText={setTipoManutencao} placeholder="Ex: Troca de HD" />

          <Text style={styles.label}>Cliente</Text>
          <TextInput style={styles.input} value={cliente} onChangeText={setCliente} placeholder="Ex: João da Silva" />

          <Text style={styles.label}>CEP</Text>
          <TextInput style={styles.input} value={cep} onChangeText={buscarEnderecoPorCep} placeholder="Ex: 74600000" keyboardType="numeric" />

          <Text style={styles.label}>Endereço</Text>
          <TextInput style={styles.input} value={endereco} editable={false} />

          <Text style={styles.label}>Custo (R$)</Text>
          <TextInput style={styles.input} value={custo} onChangeText={(text) => setCusto(formatInputToCurrency(text))} keyboardType="numeric" placeholder="Ex: 250,00" />

          <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
          <TextInput style={styles.input} value={dataManutencao} onChangeText={(text) => setDataManutencao(formatInputDate(text))} keyboardType="numeric" placeholder="Ex: 25/06/2025" />

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
