// FooterNav.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native"; // импорт для RN

export default function FooterNav() {
  const navigation = useNavigation()

    return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => {  navigation.navigate("Profile")  }}>
        <Icon name="person-circle" size={24} color="#2e7d32" />
        <Text style={styles.label}>Профиль</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {  navigation.navigate("Passwords")  }}>
        <Icon name="lock-closed" size={24} color="#2e7d32" />
        <Text style={styles.label}>Пароли</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("GeneratePasswords")}}>
        <Icon name="key" size={24} color="#2e7d32" />
        <Text style={styles.label}>Генератор</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e8f5e9", // светлый зелёный фон
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#c8e6c9",
  },
  button: {
    alignItems: "center",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#2e7d32", // тёмно-зелёный текст
    fontWeight: "bold",
  },
});
