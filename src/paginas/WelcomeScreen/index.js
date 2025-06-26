import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo-pclog.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo ao PCLog</Text>
      <Text style={styles.subtitle}>
        Cadastre serviços de TI e acompanhe suas manutenções com facilidade.
      </Text>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("IncluirManutencao")}
      >
        <Text style={styles.buttonText}>+ Nova Manutenção</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate("ListarManutencao")}
      >
        <Text style={styles.secondaryText}>Ver Manutenções</Text>
      </TouchableOpacity>
    </View>
  );
}
