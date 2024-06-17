import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    HomeScreen: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type HomeScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
