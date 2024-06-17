import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screen/HomeScreen';
import SignInScreen from '@screen/SignInScreen';
import SignUpScreen from '@screen/SignUpScreen';
import WelcomeScreen from '@screen/WelcomeScreen';
import { RootStackParamList } from '@type/navigator.type';
import React from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    }
};

const Navigator = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
