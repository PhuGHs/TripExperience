import ArrowButton from '@component/ArrowButton';
import { useAuth } from '@context/auth-context';
import { UserContext } from '@context/user-context';
import { TabsScreenProps } from '@type/navigator.type';
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    Cog6ToothIcon,
    EnvelopeIcon,
    QuestionMarkCircleIcon,
    UserCircleIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = ({ navigation }: TabsScreenProps) => {
    const { signOut } = useAuth();
    const { user } = useContext(UserContext);
    return (
        <SafeAreaView className='flex flex-1 mx-4 mt-4'>
            <View className='h-[10%] flex flex-row justify-between items-center'>
                <Text className='text-primary text-3xl font-bold'>Tài khoản</Text>
                <Image
                    source={{ uri: user.avatar }}
                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                />
            </View>
            <View className='flex flex-col items-start'>
                <ArrowButton
                    name='Hồ sơ'
                    icon={UserCircleIcon}
                    press={() => navigation.push('ProfileScreen')}
                />
                <View className='h-[2px] w-full bg-slate-300'></View>
                <ArrowButton
                    name='Tin nhắn'
                    icon={EnvelopeIcon}
                    press={() => navigation.push('ChatScreen')}
                />
                <View className='h-[2px] w-full bg-slate-300'></View>
                <ArrowButton name='Cài đặt' icon={Cog6ToothIcon} press={() => {}} />
                <View className='h-[2px] w-full bg-slate-300'></View>
                <ArrowButton name='Hỗ trợ' icon={QuestionMarkCircleIcon} press={() => {}} />
                <View className='h-[2px] w-full bg-slate-300'></View>
            </View>
            <TouchableOpacity
                onPress={signOut}
                className='my-8 rounded-full w-full border-[#1e1e1e] border-[1.5px] py-3'
            >
                <Text className='text-primary font-medium text-xl text-center'>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AccountScreen;
