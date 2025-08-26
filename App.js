import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import ProfileScreen from "./screens/Profile";
import PasswordsScreen from "./screens/Passwords";
import GeneratePasswordScreen from "./screens/GeneratePassword";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Profile'} screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name={'Profile'}
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name={'Passwords'}
                    component={PasswordsScreen}
                />
                <Stack.Screen
                    name={'GeneratePasswords'}
                    component={GeneratePasswordScreen}
                />
                <Stack.Screen
                    name={'Registraion'}
                    component={RegistrationScreen}
                />
                <Stack.Screen
                    name={'Login'}
                    component={LoginScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

