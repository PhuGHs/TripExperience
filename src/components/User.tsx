import { TUser } from '@type/user.type';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface IUser {
    press: () => void,
    user: TUser
}

const User = ({ user, press }: IUser) => {
    return (
        <TouchableOpacity
            onPress={press}
            className='flex flex-row my-2 space-x-2 w-full bg-gray-200 py-2 rounded-full'>
            <View className='w-[20%] items-center justify-start'>
                <Image
                    source={{ uri: user.avatar }}
                    style={{width: 60, height: 60, borderRadius: 60/2}}
                />
            </View>
            <View className='w-[78%] flex flex-col justify-around items-start'>
                <Text className='text-primary font-semibold text-lg'>{ user.userName }</Text>
                <Text className='text-primary font-light text-base'>Hà Nội</Text>
            </View>
        </TouchableOpacity>
    );
};

export default User;