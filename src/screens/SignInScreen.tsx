import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { SignInScreenProps } from '@type/navigator.type';
import { useInput } from '@hook/useInput';
import { Validator } from '@root/helpers/validator';
import { AuthApi } from '@api/auth.api';
import { ToastOptions, toast } from '@baronha/ting';
import { UserContext } from '@context/user-context';
import { useAuth } from '@context/auth-context';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [executed, setExecuted] = useState<boolean>(true);
    const { setUser } = useContext(UserContext);
    const { signIn } = useAuth();

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

    const handleLogin = async () => {
        try {
            setExecuted(false);
            const { data } = await AuthApi.login({ email: emailValue, password: passwordValue });
            const { accessToken, user } = data;
            if (accessToken && user) {
                setEmailValue('');
                setPasswordValue('');
                setUser(user);
                signIn('Bearer ' + accessToken);
                setExecuted(true);
                navigation.push('Tabs');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const { title, status } = error.response.data;
                const options: ToastOptions = {
                    title: 'Login failed',
                    message: title,
                    preset: 'error',
                    backgroundColor: '#e2e8f0',
                };
                toast(options);
            } else {
                console.log('come 2');
            }
            setExecuted(true);
        }
    };

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
        <>
            <ScrollView className='flex-1 mx-4 space-y-4'>
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
                <View className='flex-col space-y-2 mb-4'>
                    <Text className='font-bold text-2xl text-slate-700'>Đăng nhập</Text>
                    <Text className='text-base text-slate-500'>
                        Hãy đăng nhập để có thể tiếp tục sử dụng ứng dụng!
                    </Text>
                </View>
                <View className='flex flex-col space-y-2'>
                    <Text className='ml-2 text-xl text-slate-700 font-bold'>Email</Text>
                    <TextInput
                        value={emailValue}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder='Nhập email của bạn'
                        placeholderTextColor={'#94a3b8'}
                        className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                    />
                    {emailHasError && emailDidEdit && (
                        <Text className='text-red-400 ml-3'>Email không đúng định dạng</Text>
                    )}
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
                    {passwordHasError && passwordDidEdit && (
                        <Text className='text-red-400 ml-3'>Mật khẩu không phù hợp</Text>
                    )}
                </View>
                <View className='items-end'>
                    <TouchableOpacity>
                        <Text className='text-slate-600 font-bold text-base'>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogin} className='rounded-full bg-main px-4 py-5'>
                    <Text className='text-white text-lg text-center font-bold'>Đăng nhập</Text>
                </TouchableOpacity>
                <View className='flex flex-row items-center justify-center space-x-2'>
                    <Text className='text-gray-700 text-base'>Chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                        <Text className='text-[#FF6F61] font-bold text-base'>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {!executed && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default SignInScreen;
