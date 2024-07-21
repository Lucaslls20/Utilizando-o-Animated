import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard, Alert } from "react-native";

const App = () => {
    const [OfSett] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));
    const [currentScreen, setCurrentScreen] = useState('login');

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(OfSett.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: false
            }).start(),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            }).start()
        ]);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [OfSett, opacity, logo]);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 55,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 65,
                duration: 100,
                useNativeDriver: false
            })
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 130,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 155,
                duration: 100,
                useNativeDriver: false
            })
        ]).start();
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            {currentScreen === 'login' && (
                <>
                    <View style={styles.viewLogo}>
                        <Animated.Image
                            source={{ uri: 'https://cdn.pixabay.com/photo/2017/06/19/04/31/logo-2418156_1280.png' }}
                            style={{
                                width: logo.x,
                                height: logo.y
                            }}
                        />
                    </View>

                    <Animated.View style={[styles.container, {
                        opacity: opacity,
                        transform: [
                            { translateY: OfSett.y }
                        ]
                    }]}>
                        <TextInput
                            placeholder="Email"
                            autoCorrect={false}
                            onChangeText={(text) => console.log(text)}
                            style={styles.input}
                            placeholderTextColor='black'
                        />

                        <TextInput
                            placeholder="Senha"
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={(text) => console.log(text)}
                            style={styles.input}
                            placeholderTextColor='black'
                        />

                        <TouchableOpacity style={styles.btnButton} onPress={() => Alert.alert('Você acabou de acessar')}>
                            <Text style={styles.btnText}>Acessar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnRegister} onPress={() => Alert.alert('Você gostaria de criar conta?')}>
                            <Text style={styles.btnRegisterText}>Criar conta gratuita</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </>
            )}
        
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191919'
    },
    viewLogo: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50
    },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 15,
        width: '90%',
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10
    },
    btnButton: {
        backgroundColor: '#35AAFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnText: {
        fontSize: 18,
        color: '#FFF'
    },
    btnRegister: {
        marginTop: 10
    },
    btnRegisterText: {
        color: '#FFF'
    }
});

export default App;



