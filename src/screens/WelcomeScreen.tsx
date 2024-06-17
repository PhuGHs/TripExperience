import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { WelcomeScreenProps } from '@type/navigator.type';

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
    return (
        <SafeAreaView className='flex-1 h-full w-full justify-between'>
            <View className='flex-col justify-center h-[80%]'>
                <Image 
                    style={{width: '100%', height: 400 }}
                    resizeMode='cover'
                    source={require('@asset/images/login.png')}
                />
                <View className='flex flex-row space-x-4 items-center'>
                    <Image
                        style={{width: 70, height: 70}}
                        resizeMode='stretch'
                        source={require('@asset/images/logo.png')}
                    />
                    <View className='flex flex-row'>
                        <Text className='text-2xl font-nunito-regular text-[#1E1E1E]'>Trip</Text>
                        <Text className='text-2xl text-[#1E1E1E]'>Experience</Text>
                    </View>
                </View>
                <View className='space-y-4 mt-4'>
                    <Text className='text-2xl mx-4 font-bold text-[#1E1E1E]'>Experience the World Together</Text>
                    <Text className='text-lg mx-4 text-[#7F7F81]'>Connect with fellow travelers from around the globe and share your most memorable adventures on Trip Experience.</Text>
                </View>
            </View>
            <View className='w-full h-[20%] item-center'>
                <View className='w-full space-y-2 px-4'>
                        <TouchableOpacity 
                            onPress={() => navigation.push('SignIn')}
                            className='bg-[#FF6F61] py-4 rounded-full'>
                            <Text className='text-white text-center text-lg'>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.push('SignUp')}
                            className='bg-white rounded-full border-[1px] py-4'>
                            <Text className='text-gray-700 text-center text-lg border-gray-700 text-[#1E1E1E]'>Register</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            
        </SafeAreaView>
    );
};

export default WelcomeScreen;