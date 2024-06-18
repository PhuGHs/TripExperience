import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DestinationDetails from '@screen/DestinationDetails';
import ReviewScreen from '@screen/ReviewScreen';
import SignInScreen from '@screen/SignInScreen';
import SignUpScreen from '@screen/SignUpScreen';
import WelcomeScreen from '@screen/WelcomeScreen';
import { RootStackParamList } from '@type/navigator.type';
import React from 'react';
import Tabs from './BottomTab';
import SearchDestinationRatingScreen from '@screen/SearchDestinationRatingScreen';
import ReviewDestination from '@screen/ReviewDestination';

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
                <Stack.Screen name='Tabs' component={Tabs} />
                <Stack.Screen name='SearchDestinationRatingScreen' component={SearchDestinationRatingScreen} />
                <Stack.Screen name='ReviewDestinationScreen' component={ReviewDestination} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='DestinationDetails' component={DestinationDetails} />
                <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
