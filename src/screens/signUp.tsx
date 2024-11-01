import React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

const SignupScreen = ({ navigation }: any) => {
    let email = "";
    let password = "";
    let confirmPassword = "";

    const onSignUp = () => {
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);
        // Sign-up logic goes here
    };

    const onLogin = () => {
        navigation.navigate("login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={(text) => (confirmPassword = text)}
                secureTextEntry
            />

            <Button title="Sign Up" onPress={onSignUp} />

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={onLogin}>
                    <Text style={styles.loginLink}> Login</Text>
                </TouchableOpacity>
            </View>
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
    loginContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    loginText: {
        fontSize: 16,
        color: "#888",
    },
    loginLink: {
        fontSize: 16,
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default SignupScreen;
