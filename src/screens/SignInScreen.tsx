import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { SignInScreenProps } from '@type/navigator.type';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
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
            <View className='flex-col space-y-2 mb-4'>
                <Text className='font-bold text-2xl text-slate-700'>Login</Text>
                <Text className='text-base text-slate-500'>Login to continue using the app</Text>
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
            <View className='items-end'>
                <TouchableOpacity>
                    <Text className='text-slate-600 font-bold text-base'>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity className='rounded-full bg-main px-4 py-5'>
                <Text className='text-white text-lg text-center font-bold'>Login</Text>        
            </TouchableOpacity>
            <View className='flex flex-row items-center justify-center space-x-2'>
                    <Text className='text-gray-700 text-base'>Do not have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.push('SignUp')}
                    >
                        <Text className='text-[#FF6F61] font-bold text-base'>Register</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

export default SignInScreen;