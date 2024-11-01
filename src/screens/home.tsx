import React from "react";
import { Text, View, StyleSheet } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.container}>            
            <Text style={styles.title}>home works</Text>
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

export default HomeScreen;
