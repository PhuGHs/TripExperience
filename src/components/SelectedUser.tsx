import { TUser } from '@type/user.type';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

interface ISelectedUser {
    user: TUser,
    press: () => void
}

const SelectedUser = ({ user, press}: ISelectedUser) => {
    return (
        <View className='w-[90px] flex flex-col space-y-1 my-1'>
            <View>
                <View className='w-full items-center justify-center'>
                    <Image
                        source={{uri: user.avatar }}
                        style={{width: 60, height: 60, borderRadius: 60/2}}
                    />
                    <TouchableOpacity
                onPress={press}
                className='p-[0.5px] items-center justify-center rounded-full bg-black absolute top-0 right-0'>
                <XMarkIcon color='white' size={24} />
            </TouchableOpacity>
                </View>
                <View className='items-center justify-center'>
                    <Text className='text-primary text-base'>{user.userName}</Text>
                </View>
            </View>
        </View>
    );
};

export default SelectedUser;