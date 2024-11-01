import React from "react";
import { Button, Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";

const LoginScreen = ({ navigation }: any) => {
    let email = "";
    let password = "";

    const onLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
        navigation.navigate("home");
    };

    const onSignUp = () => {
        navigation.navigate("signUp");
        
    };

    const onGoogleSignUp = () => {
        console.log("Sign up with Google");
        // Google sign-in logic goes here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => (email = text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => (password = text)}
                secureTextEntry
            />

            <Button title="Login" onPress={onLogin} />

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={onSignUp}>
                    <Text style={styles.signupLink}> Sign Up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={onGoogleSignUp}>
                <Image
                    source={{ uri: "https://img.icons8.com/color/48/000000/google-logo.png" }}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    signupContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    signupText: {
        fontSize: 16,
        color: "#888",
    },
    signupLink: {
        fontSize: 16,
        color: "#007bff",
        fontWeight: "bold",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        justifyContent: "center",
        marginTop: 20,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        fontWeight: "bold",
        color: "#555",
    },
});

export default LoginScreen;
