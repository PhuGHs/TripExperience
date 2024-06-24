import React from 'react';
import { NewPostScreenProps, RootStackParamList } from '@type/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { MapPinIcon, PhotoIcon } from 'react-native-heroicons/solid';

const NewPostScreen = ({ navigation }: NewPostScreenProps) => {
    return (
        <SafeAreaView className='flex flex-1 h-full w-full'>
            <View className='h-full px-4'>
                <View className='flex flex-row items-center mt-2 mb-5'>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={20} />
                    </TouchableOpacity>
                    <Text className='flex-1 text-center mr-[20px] text-primary text-xl font-bold'>
                        Thêm bài viết
                    </Text>
                </View>
                <View className='flex flex-row space-x-2'>
                    <View>
                        <Image
                            source={require('@asset/images/benthanh.jpg')}
                            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                        />
                    </View>
                    <View className='items-start justify-around'>
                        <Text className='font-bold text-slate-700 text-lg'>Hoàng Phúc</Text>
                        <Text className='text-base italic'>22/06/2024</Text>
                    </View>
                </View>
                <TextInput
                    placeholder='Bạn đang nghĩ gì'
                    className='text-xl text-primary h-[250px] mb-3'
                    textAlignVertical='top'
                />
                <View className='mb-5'>
                    <View className='border-b border-[#E3E1D9] w-full mb-4' />
                    <TouchableOpacity className='flex-row space-x-2 items-center mb-4'>
                        <PhotoIcon size={24} color='#096C47' />
                        <Text className='text-primary text-base'>Thêm ảnh</Text>
                    </TouchableOpacity>
                    <View className='border-b border-[#E3E1D9] w-full mb-4' />
                    <TouchableOpacity className='flex-row space-x-2 items-center mb-4'>
                        <MapPinIcon size={24} color='#FF6F61' />
                        <Text className='text-primary text-base'>Thêm địa điểm</Text>
                    </TouchableOpacity>
                    <View className='border-b border-[#E3E1D9] w-full' />
                </View>
                <View className='flex items-center'>
                    <TouchableOpacity className='w-[50%] items-center py-2 bg-main rounded'>
                        <Text className='text-white font-bold text-base'>Thêm bài viết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewPostScreen;
