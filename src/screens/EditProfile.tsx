import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { EditProfileScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Asset,
    ImageLibraryOptions,
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';
import { UserContext } from '@context/user-context';
import { useInput } from '@hook/useInput';
import { UserApi } from '@api/user.api';
import { ImageApi } from '@api/image.api';
import { TPutUser } from '@type/user.type';
import { ToastOptions, toast } from '@baronha/ting';

const EditProfile = ({
    route,
    navigation,
}: EditProfileScreenScreenProps & {
    route: RouteProp<RootStackParamList, 'EditProfileScreen'>;
}) => {
    const { user, setUser } = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState<Asset>();
    const [image, setImage] = useState<string>('');
    const [executed, setExecuted] = useState<boolean>(true);

    const pickImages = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: true,
            presentationStyle: 'fullScreen',
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        setSelectedImage(result.assets[0]);
        setImage(result.assets[0].uri);
    };

    const {
        value: userName,
        handleInputBlur: handleUserNameBlur,
        handleInputChange: handleUserNameChange,
        setEnteredValue: setUserName,
        didEdit: userNameDidEdit,
        hasError: userNameHasError,
    } = useInput({
        defaultValue: user.userName,
        validationFn: () => true,
    });

    const {
        value: introduction,
        handleInputChange: handleIntroductionChange,
        handleInputBlur: handleIntroductionBlur,
        setEnteredValue: setIntroductionValue,
        hasError: introductionHasError,
        didEdit,
        setDidEdit,
    } = useInput({
        defaultValue: user.userDescription ? user.userDescription : '',
        validationFn: (value) => value.trim().split(/\s+/).length > 2,
    });

    const wordCount = introduction.trim().split(/\s+/).length;

    const handleChangeInfo = async () => {
        try {
            setExecuted(false);
            const { data, message } = await ImageApi.pushImage({fileName: selectedImage.fileName, base64: selectedImage.base64});
            const body: TPutUser = {
                avatar: data.photoUrl,
                userId: user.id,
                userDescription: introduction,
                cityId: route.params ? route.params.city.cityId : 4
            };
            const { data: us} = await UserApi.changeInfo(body);
            const options: ToastOptions = {
                title: 'Đã thay đổi thành công',
                message: 'Bạn kiểm tra lại nhé',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            setExecuted(true);
            toast(options);
            setUser(us);
        } catch (error) {
            console.log(error);
            setExecuted(true);
        }
    };

    return (
        <>
            <ScrollView className='flex flex-1 mx-4 mt-4'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px]'>Sửa hồ sơ</Text>
                <View className='w-[10%]'></View>
            </View>
            <View className='space-y-6 my-4'>
                <TouchableOpacity onPress={pickImages} className='items-center'>
                    <View style={{ width: 100, height: 100, borderRadius: 100 / 2 }}>
                        <Image
                            source={image === '' ? {uri: user.avatar } : { uri: image }}
                            style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                        />
                        <View
                            className='absolute bottom-0 right-0 w-[40px] h-[40px] bg-white rounded-full items-center justify-center'
                            style={{ elevation: 5 }}
                        >
                            <CameraIcon color='#1e1e1e' size={24} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View className='space-y-2'>
                    <Text className='text-primary font-bold text-base'>Tên</Text>
                    <TextInput
                        editable={false}
                        value={userName}
                        onChange={handleUserNameChange}
                        onBlur={handleUserNameBlur}
                        className='border-2 border-gray-400 rounded-lg text-primary text-base font-regular px-4 py-3'
                        placeholder='Tên của bạn'
                        placeholderTextColor='#94a38b'
                    />
                </View>
                <View className='space-y-2'>
                    <Text className='text-primary font-bold text-base'>Thành phố hiện tại</Text>
                    <View
                        className='flex flex-row rounded-lg border-2 border-gray-400 w-full'>
                        <TextInput
                            value={route.params ? route.params.city.cityName : user.city.cityName}
                            onFocus={() => navigation.push('SearchCityScreen', { type: 'edit'})}
                            className='text-base font-regular px-4 py-3 w-[90%] text-primary'
                            placeholder='Tìm kiếm'
                            placeholderTextColor='#94a3b8'
                            returnKeyType='search'
                        />
                        <View className='w-[10%] items-center justify-center'>
                            <MagnifyingGlassIcon color='#1e1e1e' size={25} />
                        </View>
                    </View>
                </View>
                <View className='space-y-2'>
                    <Text className='text-primary font-bold text-base'>Giới thiệu</Text>
                    <View className='border-2 border-gray-400 rounded-lg min-h-[150px]'>
                        <TextInput
                            value={introduction}
                            onChange={handleIntroductionChange}
                            onBlur={handleIntroductionBlur}
                            className='text-base font-regular px-4 py-3 text-primary'
                            placeholder='Viết vài điều về bạn.'
                            placeholderTextColor='#94a3b8'
                            multiline={true}
                        />
                        <Text className='absolute bottom-2 right-2 text-primary'>{wordCount}/60</Text>
                    </View>
                    {introductionHasError && didEdit && <Text className='text-main'>Mục giới thiệu cần tối thiểu 3 từ</Text>}
                </View>
                <TouchableOpacity
                    disabled={introductionHasError}
                    onPress={handleChangeInfo}
                    className='bg-main rounded-xl py-4'>
                    <Text className='text-white font-bold text-center text-xl'>Lưu</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        {!executed && (
            <View style={styles.overlay}>
                <ActivityIndicator size='large' color='#FF6F61' />
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

export default EditProfile;
