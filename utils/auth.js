import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (data, navigation) => {
    const {username, password} = data;

    if (!username || !password) {
        Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
        return;
    }

    try {
        const res = await fetch("http://192.168.88.19:8000/api/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            Alert.alert("Ошибка входа", "неверное имя или пароль");
            console.error(`Ошибка входа ${res.status}`);
            return;
        }

        const responseData = await res.json();

        if (responseData.token) {
            await AsyncStorage.setItem("authToken", responseData.token);
            navigation.navigate("Profile");
        } else {
            Alert.alert("Ошибка", "Токен не получен");
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
        Alert.alert("Ошибка", "Не удалось подключиться к серверу");
    }
};


export const checkAuth = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken");

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        const res = await fetch("http://192.168.88.19:8000/api/auth-status/", {
            method: "GET",
            headers: headers,
        });

        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data; // возвращаем объект { is_authenticated, username }
    } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        return {is_authenticated: false, username: ""}; // на случай ошибки возвращаем дефолт
    }
};

