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
import style from "./style";
import api from "../../services/api";
import { formatInputDate, formatInputToCurrency } from "../../utils/formatters";

export default function AlterarManutencao({ navigation, route }) {
  const {
    id,
    equipamento: eq,
    tipoManutencao: tipo,
    cliente: cl,
    custo: cs,
    dataManutencao: dt,
    foiConcluida: fc,
    cep: cepInicial,
    endereco: enderecoInicial,
  } = route.params;

  const formatInitialDate = (isoDate) => {
    const [ano, mes, dia] = isoDate.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const [equipamento, setEquipamento] = useState(eq);
  const [tipoManutencao, setTipoManutencao] = useState(tipo);
  const [cliente, setCliente] = useState(cl || "");
  const [custo, setCusto] = useState(cs.toFixed(2).replace(".", ","));
  const [dataManutencao, setDataManutencao] = useState(formatInitialDate(dt));
  const [foiConcluida, setFoiConcluida] = useState(fc);
  const [cep, setCep] = useState(cepInicial || "");
  const [endereco, setEndereco] = useState(enderecoInicial || "");

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

  const alterarManutencao = async () => {
    if (!equipamento || !tipoManutencao || !cliente || !custo || !dataManutencao) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de salvar.");
      return;
    }

    try {
      const [dia, mes, ano] = dataManutencao.split("/");
      const dataISO = `${ano}-${mes}-${dia}`;

      await api.put(`/manutencao/atualizar/${id}`, {
        equipamento,
        tipoManutencao,
        cliente,
        custo: parseFloat(custo.replace(",", ".")),
        dataManutencao: dataISO,
        foiConcluida,
        cep,
        endereco,
      });

      Alert.alert("Sucesso", "Manutenção atualizada com sucesso!");
      navigation.navigate("ListarManutencao");
    } catch (error) {
      console.log("Erro ao atualizar:", error.response?.data || error.message);
      Alert.alert("Erro ao alterar", "Não foi possível atualizar a manutenção.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={style.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={style.card}>
          <Text style={style.title}>Editar Manutenção</Text>

          <Text style={style.label}>Equipamento</Text>
          <TextInput style={style.input} value={equipamento} onChangeText={setEquipamento} />

          <Text style={style.label}>Tipo de Manutenção</Text>
          <TextInput style={style.input} value={tipoManutencao} onChangeText={setTipoManutencao} />

          <Text style={style.label}>Cliente</Text>
          <TextInput style={style.input} value={cliente} onChangeText={setCliente} />

          <Text style={style.label}>CEP</Text>
          <TextInput style={style.input} value={cep} onChangeText={buscarEnderecoPorCep} keyboardType="numeric" placeholder="Ex: 74600000" />

          <Text style={style.label}>Endereço</Text>
          <TextInput style={style.input} value={endereco} editable={false} />

          <Text style={style.label}>Custo (R$)</Text>
          <TextInput style={style.input} value={custo} onChangeText={(text) => setCusto(formatInputToCurrency(text))} keyboardType="numeric" />

          <Text style={style.label}>Data (DD/MM/AAAA)</Text>
          <TextInput style={style.input} value={dataManutencao} onChangeText={(text) => setDataManutencao(formatInputDate(text))} keyboardType="numeric" placeholder="DD/MM/AAAA" />

          <View style={style.switchContainer}>
            <Text style={style.label}>Concluída?</Text>
            <Switch value={foiConcluida} onValueChange={setFoiConcluida} />
          </View>

          <TouchableOpacity style={style.button} onPress={alterarManutencao}>
            <Text style={style.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
