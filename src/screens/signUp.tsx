import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SignupScreen = () => {
    return (
        <View style={styles.container}>            
            <Text style={styles.title}>SignUp works</Text>
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
});

export default SignupScreen;
