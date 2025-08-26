import React, {useEffect, useState} from "react";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import FooterNav from "../components/FooterNav";
import {useNavigation} from "@react-navigation/native";
import {checkAuth} from "../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [authData, setAuthData] = useState({
        username: "",
        is_authenticated: null,
    });

    const fetchAuth = async () => {
        const data = await checkAuth();
        setAuthData(data);
    };

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) {
                console.warn("Токен не найден");
                return;
            }

            const res = await fetch("http://192.168.88.19:8000/api/logout/", {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}: ${res.statusText}`);
            }

            await AsyncStorage.removeItem("authToken");

            setAuthData({
                is_authenticated: false,
                username: "",
            });
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    useEffect(() => {
        fetchAuth();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {authData.is_authenticated ? (
                    <>
                        <Text style={styles.welcomeText}>Здравствуйте, {authData.username}!</Text>
                        <TouchableOpacity style={styles.primaryButton} onPress={handleLogout}>
                            <Text style={styles.primaryButtonText}>Выйти</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => navigation.navigate("Registraion")}
                        >
                            <Text style={styles.primaryButtonText}>Регистрация</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.primaryButtonText}>Вход</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <FooterNav/>
        </View>
    );
}

const styles = StyleSheet.create({
    // Цвета указаны прямо здесь, чтобы совпадали с FooterNav
    container: {
        flex: 1,
        backgroundColor: "#e8f5e9", // тот же светлый зелёный фон, что и у футера
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        color: "#2e7d32", // тёмно-зелёный — совпадает с label футера
        textAlign: "center",
    },
    primaryButton: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#2e7d32", // тёмно-зелёная кнопка (основной акцент)
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#c8e6c9", // совпадает с borderTop футера
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    primaryButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },
});
