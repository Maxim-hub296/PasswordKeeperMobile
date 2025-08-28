import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function sendPassword(site_name, login, password) {
    try {
        const token = await AsyncStorage.getItem('authToken');

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }

        const data = {
            site_name: site_name,
            login: login,
            password: password
        };

        const res = await fetch('http://192.168.88.19:8000/api/save-password/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            console.error(`Ошибка: ${res.status}`);
        } else {
            console.log("Пароль успешно отправлен!");
        }

    } catch (error) {
        console.error("Ошибка при отправке пароля:", error);
    }
}
