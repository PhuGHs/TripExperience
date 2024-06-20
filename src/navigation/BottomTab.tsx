import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HeartIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    UserCircleIcon,
} from 'react-native-heroicons/outline';
import { BottomTabParamList } from '@type/navigator.type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '@screen/HomeScreen';
import SearchScreen from '@screen/SearchScreen';
import PlanScreen from '@screen/PlanScreen';
import RatingScreen from '@screen/RatingScreen';
import AccountScreen from '@screen/AccountScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabBarIcon = ({ icon: Icon, label, focused }) => {
    return (
        <View style={[styles.tabItemContainer, focused && styles.focusedTab]}>
            <Icon color={focused ? '#1e1e1e' : '#8e8e93'} size={24} />
            <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>{label}</Text>
        </View>
    );
};

const Tabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { paddingBottom: insets.bottom, ...styles.tabBar },
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: '#1e1e1e'
            }}
        >
            <Tab.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={HomeIcon} label="Khám phá" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name='SearchScreen'
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={MagnifyingGlassIcon} label="Tìm kiếm" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name='PlanScreen'
                component={PlanScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={HeartIcon} label="Kế hoạch" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name='RatingScreen'
                component={RatingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={PencilIcon} label="Đánh giá" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name='AccountScreen'
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={UserCircleIcon} label="Tài khoản" focused={focused} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: '#f4f4f5',
    },
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    tabItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    focusedTab: {
        borderTopWidth: 4,
        borderTopColor: '#FF6F61',
    },
    tabLabel: {
        fontSize: 13,
        marginTop: 2,
        color: '#8e8e93',
    },
    focusedTabLabel: {
        color: '#1e1e1e',
    },
});

export default Tabs;
