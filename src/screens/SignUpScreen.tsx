import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { RootStackParamList, SignInScreenProps, SignUpScreenProps } from '@type/navigator.type';
import { useInput } from '@hook/useInput';
import { Validator } from '@root/helpers/validator';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { RouteProp } from '@react-navigation/native';
import { AuthApi } from '@api/auth.api';
import { TSignUp } from '@type/account.type';
import { ToastOptions, toast } from '@baronha/ting';

const SignUpScreen = ({
    route,
    navigation,
}: SignUpScreenProps & {
    route: RouteProp<RootStackParamList, 'SignUp'>;
}) => {
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
        value: username,
        handleInputBlur: handleUsernameBlur,
        handleInputChange: handleUsernameChange,
        setEnteredValue: setUsernameValue,
        didEdit: usernameDidEdit,
        hasError: usernameHasError,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value !== '',
    });

    const {
        value: sdt,
        handleInputBlur: handleSDTBlur,
        handleInputChange: handleSDTChange,
        setEnteredValue: setSDTValue,
        didEdit: sdtDidEdit,
        hasError: sdtHasError,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value !== '',
    });

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
        validationFn: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value),
    });

    const handleSignUp = async () => {
        try {
            if (!route.params || !route.params.city) {
                const options: ToastOptions = {
                    title: 'Đăng ký thất bại',
                    message: 'Bạn chưa chọn nơi ở',
                    preset: 'error',
                    backgroundColor: '#e2e8f0',
                };
                toast(options);
                return;
            }
            const body: TSignUp = {
                userName: username,
                password: passwordValue,
                phone: sdt,
                email: emailValue,
                city: route.params.city,
                cityId: route.params.city.cityId
            };
            await AuthApi.signup(body);
            const options: ToastOptions = {
                title: 'Đăng ký tài khoản thành công',
                message: 'Đăng nhâp để sử dụng nhé',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            navigation.navigate('SignIn');
        } catch (error) {
            console.log(error);
            const { title, status } = error.response.data;
                const options: ToastOptions = {
                    title: 'Lỗi đăng ký',
                    message: title,
                    preset: 'error',
                    backgroundColor: '#e2e8f0',
                };
                toast(options);
        }
    };

    return (
        <ScrollView className='flex-1 mx-4 my-4 space-y-4'>
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
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameBlur}
                    placeholder='Nhập Username'
                    placeholderTextColor={'#94a3b8'}
                    className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                />
                {usernameHasError && usernameDidEdit && <Text className='text-main ml-2'>Không được để trống trường này</Text>}
            </View>
            <View className='flex flex-row justify-between'>
                <View className='flex flex-col space-y-2 w-[49%]'>
                    <Text className='ml-2 text-xl text-slate-700 font-bold'>Số điện thoại</Text>
                    <TextInput
                            value={sdt}
                            onChange={handleSDTChange}
                            onBlur={handleSDTBlur}
                            keyboardType='number-pad'
                            placeholder='SĐT'
                            placeholderTextColor={'#94a3b8'}
                            className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                        />
                    {sdtDidEdit && sdtHasError && <Text className='text-main ml-2'>SDT không đúng định dạng</Text>}
                </View>
                <View className='flex flex-col space-y-2 w-[49%]'>
                    <Text className='ml-2 text-xl text-slate-700 font-bold'>Bạn sống ở đâu?</Text>
                    <View className='justify-center'>
                        <TextInput
                            value={route.params ? route.params.city.cityName : ''}
                            onFocus={() => navigation.push('SearchCityScreen', { type: 'signup'})}
                            placeholder='Tìm kiếm'
                            placeholderTextColor={'#94a3b8'}
                            className='px-5 py-4 bg-slate-100 text-base rounded-full text-slate-700 border-[1px] border-slate-300'
                        />
                        <View className='absolute right-3'>
                            <MagnifyingGlassIcon size={25} color='#94a3b8' />
                        </View>
                    </View>
                </View>
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
                {emailHasError && emailDidEdit && <Text className='text-main ml-2'>Email không đúng định dạng</Text>}
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
                {passwordHasError && passwordDidEdit && <Text className='text-main'>Mật khẩu phải có tối thiểu 6 ký tự, bao gồm ký tự đặc biệt, một chữ cái thường và một chữ cái in hoa</Text>}
            </View>
            <TouchableOpacity
                onPress={handleSignUp}
                className='rounded-full bg-main px-4 py-5'>
                <Text className='text-white text-lg text-center font-bold'>Đăng ký</Text>
            </TouchableOpacity>
            <View className='flex flex-row items-center justify-center space-x-2'>
                <Text className='text-gray-700 text-base'>Đã có tài khoản rồi?</Text>
                <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                    <Text className='text-[#FF6F61] font-bold text-base'>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
