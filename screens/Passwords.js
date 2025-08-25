import React from "react";
import {Text, View} from "react-native";
import FooterNav from "../components/FooterNav";


export default function PasswordsScreen() {
    return (
        <View style={{flex: 1}}>
            <Text style={{flex: 1, textAlign: "center", marginTop: 100}}>Экран паролей</Text>
            <FooterNav/>
        </View>
    )
}