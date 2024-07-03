import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DestinationDetails from '@screen/DestinationDetails';
import ReviewScreen from '@screen/ReviewScreen';
import SignInScreen from '@screen/SignInScreen';
import SignUpScreen from '@screen/SignUpScreen';
import WelcomeScreen from '@screen/WelcomeScreen';
import { RootStackParamList } from '@type/navigator.type';
import React, { useContext } from 'react';
import Tabs from './BottomTab';
import SearchDestinationRatingScreen from '@screen/SearchDestinationRatingScreen';
import ReviewDestination from '@screen/ReviewDestination';
import PlanDetails from '@screen/PlanDetails';
import UpdatePlanScreen from '@screen/UpdatePlanScreen';
import DestinationReviewScreen from '@screen/DestinationReviewScreen';
import ProfileScreen from '@screen/ProfileScreen';
import EditProfile from '@screen/EditProfile';
import ChatScreen from '@screen/ChatScreen';
import MessageScreen from '@screen/MessageScreen';
import SearchConversation from '@screen/SearchConversation';
import GroupDetailScreen from '@screen/GroupDetailScreen';
import PostDetailScreen from '@screen/PostDetailScreen';
import NewPostScreen from '@screen/NewPostScreen';
import { useAuth } from '@context/auth-context';
import SearchCityScreen from '@screen/SearchCityScreen';
import CreateChatRoom from '@screen/CreateChatRoom';
import { UserContext } from '@context/user-context';
import AddCityPlan from '@screen/AddCityPlan';
import MapViewScreen from '@screen/MapViewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
    },
};

const Navigator = () => {
    const { token } = useAuth();
    const { user } = useContext(UserContext);
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {token === null || user === null ? (
                    <>
                        <Stack.Screen name='Welcome' component={WelcomeScreen} />
                        <Stack.Screen name='SignIn' component={SignInScreen} />
                        <Stack.Screen name='SignUp' component={SignUpScreen} />
                        <Stack.Screen name='SearchCityScreen' component={SearchCityScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name='Tabs' component={Tabs} />
                        <Stack.Screen
                            name='SearchDestinationRatingScreen'
                            component={SearchDestinationRatingScreen}
                        />
                        <Stack.Screen
                            name='ReviewDestinationScreen'
                            component={ReviewDestination}
                        />
                        <Stack.Screen
                            name='DestinationReviewScreen'
                            component={DestinationReviewScreen}
                        />
                        <Stack.Screen name='DestinationDetails' component={DestinationDetails} />
                        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                        <Stack.Screen name='EditProfileScreen' component={EditProfile} />
                        <Stack.Screen name='ChatScreen' component={ChatScreen} />
                        <Stack.Screen name='MessageScreen' component={MessageScreen} />
                        <Stack.Screen name='SearchConversation' component={SearchConversation} />
                        <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
                        <Stack.Screen name='PlanDetails' component={PlanDetails} />
                        <Stack.Screen name='UpdatePlan' component={UpdatePlanScreen} />
                        <Stack.Screen name='GroupDetailScreen' component={GroupDetailScreen} />
                        <Stack.Screen name='PostDetailScreen' component={PostDetailScreen} />
                        <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
                        <Stack.Screen name='SearchCityScreen' component={SearchCityScreen} />
                        <Stack.Screen name='CreateChatRoom' component={CreateChatRoom} />
                        <Stack.Screen name='AddCityPlan' component={AddCityPlan} />
                        <Stack.Screen name='MapViewScreen' component={MapViewScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
