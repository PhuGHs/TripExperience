import ArrowButton from '@component/ArrowButton';
import { TabsScreenProps } from '@type/navigator.type';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Cog6ToothIcon, EnvelopeIcon, QuestionMarkCircleIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <View className='h-[10%] flex flex-row justify-between items-center'>
                <Text className='text-primary text-3xl font-bold'>Tài khoản</Text>
                <Image
                    source={require('@asset/images/benthanh.jpg')}
                    style={{width: 50, height: 50, borderRadius: 50/2}}
                />
            </View>
            <View className='flex flex-col items-start'>
                <ArrowButton name='Hồ sơ' icon={UserCircleIcon} press={() => navigation.push('ProfileScreen')}/>
                <View className='h-[2px] w-full bg-slate-300'></View>
                <ArrowButton name='Tin nhắn' icon={EnvelopeIcon} press={() => {}}/>
                <View className='h-[2px] w-full bg-slate-300'></View>
                <ArrowButton name='Cài đặt' icon={Cog6ToothIcon} press={() => {}}/>
                <View className='h-[2px] w-full bg-slate-300'></View>
                <ArrowButton name='Hỗ trợ' icon={QuestionMarkCircleIcon} press={() => {}}/>
                <View className='h-[2px] w-full bg-slate-300'></View>
            </View>
            <TouchableOpacity className='my-8 rounded-full w-full border-[#1e1e1e] border-2 py-4'>
                <Text className='text-primary font-bold text-xl text-center'>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AccountScreen;