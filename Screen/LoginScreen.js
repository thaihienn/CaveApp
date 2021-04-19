
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
    Alert,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    StatusBar,
} from 'react-native';
import { Button, Input, Image } from "react-native-elements";



const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;



    }, []);






    const login = () => {
        try {
            auth().signInWithEmailAndPassword(email, password)
                .then(
                    () => { navigation.replace('Home') })
            Alert.alert('Login Successs', 'Success');
            console.log(user);

        } catch (email) {
            console.log(email.message);
        }

    }

    return (
        <KeyboardAvoidingView behavior="padding" style={style.container}  >
            <StatusBar style="light" />
            <Image
                source={{
                    uri:
                        "https://cdn.dribbble.com/users/403733/screenshots/14784188/0-logo__________1____32.jpg",
                }}
                style={{ width: 200, height: 200, borderRadius: 50 }}
            />
            <View style={style.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="Password"
                    secureTextEntry type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <Button color="#f194ff" containerStyle={style.button} onPress={login} title="Login" />
            <Button containerStyle={style.button} onPress={() => navigation.push('Register')} type="outline" title="Register" />

        </KeyboardAvoidingView>
    );
}

export default LoginScreen;
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    inputContainer: {
        width: 350,
        marginTop: 10
    },
    button: {

        width: 200,
        marginTop: 10
    }
})

