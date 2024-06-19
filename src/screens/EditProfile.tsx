import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { EditProfileScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React from 'react';
import { TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import { CameraIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfile = ({
    route,
    navigation,
}: EditProfileScreenScreenProps & { route: RouteProp<RootStackParamList, 'EditProfileScreen'> }) => {

    const pickImages = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: true,
            presentationStyle: 'fullScreen',
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        console.log(result);
    };
    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity 
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'>
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px]'>Sửa hồ sơ</Text>
                <View className='w-[10%]'></View>
            </View>
            <View className='space-y-6 my-4'>
                <TouchableOpacity 
                    onPress={pickImages}
                    className='items-center'>
                    <View style={{width: 100, height: 100, borderRadius: 100/2}}>
                        <Image
                            source={require('@asset/images/benthanh.jpg')}
                            style={{width: 100, height: 100, borderRadius: 100/2}}
                        />
                        <View className='absolute bottom-0 right-0 w-[40px] h-[40px] bg-white rounded-full items-center justify-center' style={{elevation: 5}}>
                            <CameraIcon color='#1e1e1e' size={24}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View className='space-y-2'>
                    <Text className='text-primary font-bold text-base'>Tên</Text>
                    <TextInput
                        className='border-2 border-gray-400 rounded-lg text-base font-bold px-4 py-3'
                        placeholder='Tên của bạn'
                    />
                </View>
                <View className='space-y-2'>
                    <Text className='text-primary font-bold text-base'>Thành phố hiện tại</Text>
                    <View className='flex flex-row rounded-lg border-2 border-gray-400 w-full'>
                        <TextInput
                            className='text-base font-bold px-4 py-3 w-[90%]'
                            placeholder='Tìm kiếm'
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
                            className='text-base font-bold px-4 py-3'
                            placeholder='Viết vài điều về bạn.'
                            multiline={true}
                        />
                        <Text className='absolute bottom-2 right-2 text-primary'>0/160</Text>
                    </View>
                </View>
                <TouchableOpacity className='bg-main rounded-full py-4'>
                    <Text className='text-white font-bold text-center text-xl'>Lưu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EditProfile;