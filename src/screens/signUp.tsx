import React, { useState } from "react";
import { 
    Text, 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity,
    ActivityIndicator,
    Alert 
} from "react-native";
import auth from '@react-native-firebase/auth';

const SignupScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ 
        email: "", 
        password: "", 
        confirmPassword: "" 
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { 
            email: "", 
            password: "", 
            confirmPassword: "" 
        };

        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSignUp = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            await auth().createUserWithEmailAndPassword(email, password);
            navigation.replace("home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
                style={[styles.input, errors.password ? styles.inputError : null]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TextInput
                style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {errors.confirmPassword ? 
                <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <TouchableOpacity 
                style={styles.signupButton} 
                onPress={onSignUp}
                disabled={loading}
            >
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
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
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    signupButton: {
        backgroundColor: '#007bff',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default SignupScreen;