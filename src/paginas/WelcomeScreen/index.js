import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo-pclog.png")} // substitua pelo seu ícone
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo ao PCLog</Text>
      <Text style={styles.subtitle}>Cadastre serviços de TI e acompanhe as manutenções</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("IncluirManutencao")}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ListarManutencao")}>
        <Text style={styles.loginText}>Ver Manutenções</Text>
      </TouchableOpacity>
    </View>
  );
}
