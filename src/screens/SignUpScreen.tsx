import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { SignInScreenProps } from '@type/navigator.type';
import { useInput } from '@hook/useInput';
import { Validator } from '@root/helpers/validator';

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

    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleInputChange: handleEmailChange,
        setEnteredValue: setEmailValue,
        didEdit: emailDidEdit,
        hasError: emailHasError,
    } = useInput({
        defaultValue: '',
        validationFn: (email: string) => Validator.validateEmail(email),
    });

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        setEnteredValue: setPasswordValue,
        didEdit: passwordDidEdit,
        hasError: passwordHasError,
    } = useInput({
        defaultValue: '',
        validationFn: (email: string) => Validator.validateEmail(email),
    });

    return (
        <SafeAreaView className='flex-1 mx-4 space-y-4'>
            <View className='flex items-start'>
                <View className='jusitfy-center items-center'>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border-[1px] border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            {!isKeyboardVisible && (
                <View>
                    <Image
                        source={require('@asset/images/logo.png')}
                        style={{ width: 400, height: 200 }}
                    />
                </View>
            )}
            <View className='flex-col space-y-2'>
                <Text className='font-bold text-2xl text-slate-700'>Đăng ký</Text>
                <Text className='text-base text-slate-500'>Hãy nhập thông tin cá nhân!</Text>
            </View>
            <View className='flex flex-col space-y-2'>
                <Text className='ml-2 text-xl text-slate-700 font-bold'>Username</Text>
                <TextInput
                    placeholder='Nhập Username'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
            </View>
            <View className='flex flex-col space-y-2'>
                <Text className='ml-2 text-xl text-slate-700 font-bold'>Email</Text>
                <TextInput
                    value={emailValue}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder='Nhập email'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
            </View>
            <View className='flex flex-col space-y-2'>
                <Text className='ml-2 text-xl text-slate-700 font-bold'>Mật khẩu</Text>
                <TextInput
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    secureTextEntry={true}
                    placeholder='Nhập mật khẩu'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
            </View>
            <TouchableOpacity className='rounded-full bg-main px-4 py-5'>
                <Text className='text-white text-lg text-center font-bold'>Đăng ký</Text>
            </TouchableOpacity>
            <View className='flex flex-row items-center justify-center space-x-2'>
                <Text className='text-gray-700 text-base'>Đã có tài khoản rồi?</Text>
                <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                    <Text className='text-[#FF6F61] font-bold text-base'>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;
