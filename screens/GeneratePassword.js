import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";
import FooterNav from "../components/FooterNav";
import {generatePassword} from "../utils/generatePassword";
import sendPassword from "../utils/sendPassword";
export default function GeneratePasswordScreen() {
    const [site, setSite] = useState("");
    const [login, setLogin] = useState("");
    const [length, setLength] = useState(12);

    // чекбоксы
    const [cyrLower, setCyrLower] = useState(false);
    const [cyrUpper, setCyrUpper] = useState(false);
    const [latLower, setLatLower] = useState(true);
    const [latUpper, setLatUpper] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);

    const MIN_LENGTH = 4;
    const MAX_LENGTH = 64;


    const isAllEnter = [
        site,
        login
    ].every(val => val)


    const inc = () => setLength(prev => Math.min(MAX_LENGTH, prev + 1));
    const dec = () => setLength(prev => Math.max(MIN_LENGTH, prev - 1));
    const onChangeLength = (text) => {
        const val = parseInt(text.replace(/\D/g, ""), 10);
        if (Number.isNaN(val)) {
            setLength(MIN_LENGTH);
        } else {
            setLength(Math.max(MIN_LENGTH, Math.min(MAX_LENGTH, val)));
        }
    };

    const toggle = (setter) => setter(prev => !prev);

    const handleCreate = () => {
        if (!isAllEnter) {
            Alert.alert('Ошибка создания пароля', "Введите названия сайта и логин")
            return;
        }


        try {
            const pwd = generatePassword({
                length: length,
                cyrLower: cyrLower,
                cyrUpper: cyrUpper,
                latLower: latLower,
                latUpper: latUpper,
                numbers: useNumbers,
                symbols: useSymbols
            })
            Alert.alert('Сгенерированный пароль ', pwd)
            sendPassword(site, login, pwd)

        } catch (err) {
            Alert.alert('Ошибка создания пароля', err.message || 'Непредвиденная ошибка')
        }
    };

    // компонент чекбокса (простая реализация)
    const CheckBox = ({checked, onPress, label}) => (
        <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
                {checked ? <Text style={styles.checkboxTick}>✓</Text> : null}
            </View>
            <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{flex: 1}}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Создать пароль</Text>

                    <Text style={styles.fieldLabel}>Название сайта</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example.com"
                        placeholderTextColor="#81c784"
                        value={site}
                        onChangeText={setSite}
                        returnKeyType="next"
                    />

                    <Text style={styles.fieldLabel}>Логин / Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="login@example.com"
                        placeholderTextColor="#81c784"
                        value={login}
                        onChangeText={setLogin}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="done"
                    />

                    <Text style={[styles.fieldLabel, {marginTop: 8}]}>Длина пароля</Text>
                    <View style={styles.counterRow}>
                        <TouchableOpacity style={styles.counterBtn} onPress={dec}>
                            <Text style={styles.counterBtnText}>−</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.counterInput}
                            keyboardType="numeric"
                            value={String(length)}
                            onChangeText={onChangeLength}
                            textAlign="center"
                            maxLength={2}
                        />

                        <TouchableOpacity style={styles.counterBtn} onPress={inc}>
                            <Text style={styles.counterBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.hintText}>{`Минимум ${MIN_LENGTH}, максимум ${MAX_LENGTH}`}</Text>

                    <Text style={[styles.fieldLabel, {marginTop: 16}]}>Символы</Text>

                    <View style={styles.checkboxContainer}>
                        <CheckBox checked={cyrLower} onPress={() => toggle(setCyrLower)}
                                  label="Кириллица — нижний регистр"/>
                        <CheckBox checked={cyrUpper} onPress={() => toggle(setCyrUpper)}
                                  label="Кириллица — верхний регистр"/>
                        <CheckBox checked={latLower} onPress={() => toggle(setLatLower)}
                                  label="Латиница — нижний регистр"/>
                        <CheckBox checked={latUpper} onPress={() => toggle(setLatUpper)}
                                  label="Латиница — верхний регистр"/>
                        <CheckBox checked={useNumbers} onPress={() => toggle(setUseNumbers)} label="Цифры"/>
                        <CheckBox checked={useSymbols} onPress={() => toggle(setUseSymbols)} label="Спецсимволы"/>
                    </View>

                    <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                        <Text style={styles.createButtonText}>Создать пароль</Text>
                    </TouchableOpacity>

                    <View style={{height: 24}}/>
                </ScrollView>
            </KeyboardAvoidingView>

            <FooterNav/>
        </View>
    );
}

const styles = StyleSheet.create({
    // Цвета указаны прямо в стилях, чтобы совпадали с предыдущими экранами и футером
    container: {
        flex: 1,
        backgroundColor: "#e8f5e9", // тот же светлый зелёный фон
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#2e7d32",
        marginBottom: 12,
        textAlign: "left",
    },

    fieldLabel: {
        fontSize: 14,
        color: "#2e7d32",
        marginBottom: 6,
        fontWeight: "600",
    },

    input: {
        width: "100%",
        height: 48,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 10,
        fontSize: 16,
        color: "#2e7d32",
        borderWidth: 1,
        borderColor: "#c8e6c9",
    },

    // счётчик длины
    counterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    counterBtn: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#2e7d32",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft: 0,
    },
    counterBtnText: {
        color: "#fff",
        fontSize: 26,
        lineHeight: 26,
        fontWeight: "600",
    },
    counterInput: {
        width: 80,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#c8e6c9",
        fontSize: 18,
        color: "#2e7d32",
        textAlign: "center",
    },

    hintText: {
        fontSize: 12,
        color: "#2e7d32",
        marginBottom: 10,
    },

    // чекбоксы
    checkboxContainer: {
        marginTop: 6,
        marginBottom: 10,
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkboxBox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#2e7d32",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "#ffffff",
    },
    checkboxBoxChecked: {
        backgroundColor: "#2e7d32",
    },
    checkboxTick: {
        color: "#ffffff",
        fontWeight: "700",
    },
    checkboxLabel: {
        color: "#2e7d32",
        fontSize: 14,
        flexShrink: 1,
    },

    // кнопка создания пароля
    createButton: {
        marginTop: 8,
        width: "100%",
        maxWidth: 440,
        backgroundColor: "#2e7d32",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#c8e6c9",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    createButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },
});