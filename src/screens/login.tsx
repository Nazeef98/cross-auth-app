// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
// import {
//     GoogleSignin,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';

// Debug utility
const DEBUG = true;
const debug = (message: string, data?: any) => {
    if (DEBUG) {
        if (data) {
            console.log(`[DEBUG] ${message}:`, JSON.stringify(data, null, 2));
        } else {
            console.log(`[DEBUG] ${message}`);
        }
    }
};

interface LoginScreenProps {
    navigation: any;
}

interface ErrorState {
    email: string;
    password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({ email: '', password: '' });

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    // Still Working on it
    // const configureGoogleSignIn = async () => {
    //     try {
    //         await GoogleSignin.configure({
    //             webClientId: '', 
    //             offlineAccess: true,
    //             forceCodeForRefreshToken: true,
    //         });
            
            const isSignedIn = await GoogleSignin.signIn();
            debug('Initial sign-in status', { isSignedIn });
            
            if (isSignedIn) {
                const currentUser = await GoogleSignin.getCurrentUser();
                debug('Current user', currentUser);
            }
        } catch (error) {
            debug('Google Sign-In configuration error', error);
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onEmailPasswordLogin = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            debug('Attempting email/password login', { email });
            
            const userCredential = await auth().signInWithEmailAndPassword(
                email,
                password
            );
            
            debug('Login successful', { uid: userCredential.user.uid });
            navigation.replace('home');
        } catch (error: any) {
            debug('Login error', error);
            let errorMessage = 'An error occurred during login';
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address format';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                default:
                    errorMessage = error.message;
            }
            
            Alert.alert('Login Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // const onGoogleSignIn = async () => {
    //     try {
    //         setLoading(true);
    //         debug('Starting Google sign-in');

    //         await GoogleSignin.hasPlayServices({
    //             showPlayServicesUpdateDialog: true,
    //         });

    //         const signInResult = await GoogleSignin.signIn();
    //         debug('Google sign-in successful', signInResult);

    //         if (!signInResult.data?.idToken) {
    //             throw new Error('No ID token present!');
    //         }

    //         const { accessToken } = await GoogleSignin.getTokens();
    //         debug('Got Google tokens');

    //         const credential = auth.GoogleAuthProvider.credential(
    //             signInResult.data?.idToken,
    //             accessToken
    //         );

    //         const userCredential = await auth().signInWithCredential(credential);
    //         debug('Firebase sign-in successful', {
    //             uid: userCredential.user.uid,
    //         });

    //         navigation.replace('home');
    //     } catch (error: any) {
    //         debug('Google sign-in error', error);
    //         let errorMessage = 'Google Sign-In failed';

    //         switch (error.code) {
    //             case statusCodes.SIGN_IN_CANCELLED:
    //                 errorMessage = 'Sign in cancelled';
    //                 break;
    //             case statusCodes.IN_PROGRESS:
    //                 errorMessage = 'Sign in already in progress';
    //                 break;
    //             case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //                 errorMessage = 'Play Services not available';
    //                 break;
    //             default:
    //                 errorMessage = error.message || 'An unexpected error occurred';
    //         }

    //         Alert.alert('Sign In Error', errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // if (loading) {
    //     return (
    //         <View style={[styles.container, styles.centered]}>
    //             <ActivityIndicator size="large" color="#007bff" />
    //         </View>
    //     );
    // }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput
                        style={[styles.input, errors.email ? styles.inputError : null]}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="#666"
                    />
                    {errors.email ? (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}

                    <TextInput
                        style={[styles.input, errors.password ? styles.inputError : null]}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        secureTextEntry
                        placeholderTextColor="#666"
                    />
                    {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={onEmailPasswordLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => navigation.navigate('forgotPassword')}
                    >
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* <TouchableOpacity
                        style={styles.googleButton}
                        onPress={onGoogleSignIn}
                        disabled={loading}
                    > */}
                        <Image
                            source={{
                                uri: 'https://img.icons8.com/color/48/000000/google-logo.png',
                            }}
                            style={styles.googleIcon}
                        />
                        <Text style={styles.googleButtonText}>
                            Sign in with Google
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('signUp')}
                        >
                            <Text style={styles.signupLink}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    inputError: {
        borderColor: '#ff3b30',
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    loginButton: {
        backgroundColor: '#007bff',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 15,
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#007bff',
        fontSize: 14,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#666',
        fontSize: 14,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        fontSize: 14,
        color: '#666',
    },
    signupLink: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default LoginScreen;