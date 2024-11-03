import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }: any) => {
    const [user, setUser] = React.useState(auth().currentUser);

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.replace('login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>    
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={handleLogout} />
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
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        marginTop: 20,
    }
});

export default HomeScreen;