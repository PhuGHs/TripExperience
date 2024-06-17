import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { SignInScreenProps } from '@type/navigator.type';

const SignUpScreen = ({ navigation }: SignInScreenProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <SafeAreaView className='flex-1 mx-4 space-y-4'>
            <View className='flex items-start'>
                <View className='jusitfy-center items-center'>
                    <TouchableOpacity 
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border-[1px] border-slate-300'>
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            {!isKeyboardVisible && <View>
                <Image
                    source={require('@asset/images/logo.png')}
                    style={{width: 400, height: 200}}
                />
            </View>}
            <View className='flex-col space-y-2'>
                <Text className='font-bold text-2xl text-slate-700'>Register</Text>
                <Text className='text-base text-slate-500'>Enter your personal information</Text>
            </View>
            <View className='flex flex-col space-y-2'>
                <Text className='ml-2 text-xl text-slate-700 font-bold'>Full Name</Text>
                <TextInput
                    placeholder='Enter your full name'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
            </View>
            <View className='flex flex-col space-y-2'>
                <Text className='ml-2 text-xl text-slate-700 font-bold'>Email</Text>
                <TextInput
                    placeholder='Enter your email'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
            </View>
            <View className='flex flex-col space-y-2'>
                <Text className='ml-2 text-xl text-slate-700 font-bold'>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder='Enter your password'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
            </View>
            <TouchableOpacity className='rounded-full bg-main px-4 py-5'>
                <Text className='text-white text-lg text-center font-bold'>Register an account</Text>        
            </TouchableOpacity>
            <View className='flex flex-row items-center justify-center space-x-2'>
                    <Text className='text-gray-700 text-base'>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.push('SignUp')}
                    >
                        <Text className='text-[#FF6F61] font-bold text-base'>Sign In</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;