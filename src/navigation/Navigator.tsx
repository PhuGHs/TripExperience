import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DestinationDetails from '@screen/DestinationDetails';
import HomeScreen from '@screen/HomeScreen';
import ReviewScreen from '@screen/ReviewScreen';
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
        background: '#FFFFFF'
    }
};

const Navigator = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='DestinationDetails' component={DestinationDetails} />
                <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
