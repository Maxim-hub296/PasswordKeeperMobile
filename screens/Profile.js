import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import FooterNav from "../components/FooterNav";
import {useNavigation} from "@react-navigation/native";

export default function ProfileScreen() {
    const navigation = useNavigation()
    const [authData, setAuthData] = useState({
        username: '',
        isAuthenticated: null
    })

    // const getAuthData = () => {
    //     fetch('http://192.168.88.19:8000/auth-status/')
    //         .then(res => {
    //             if (!res.ok) {
    //                 console.error(`Ошибка: ${res.status} ${res.statusText}`)
    //             }
    //             return res.json()
    //         })
    //         .then(data => {
    //             setAuthData(data)
    //         })
    // }


    return (
        <View style={{flex: 1}}>
            <Text style={{flex: 1, textAlign: "center", marginTop: 100}}>Экран профиля</Text>
            <Button title={'Регистрация'} onPress={() => navigation.navigate('Registraion')}/>
            <FooterNav/>
        </View>
    )
}