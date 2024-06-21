import React from "react";
import { Image, Text, View } from "react-native";

const Comment = () => {
    return (
        <View className='flex flex-row space-x-2 mb-5'>
            <View>
                <Image
                    source={require('@asset/images/benthanh.jpg')}
                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                />
            </View>
            <View className='items-start'>
                <Text className='font-bold text-slate-700 text-base mb-1'>Hoàng Phúc</Text>
                <Text className='text-primary'>Hay quá anh êi</Text>
            </View>
        </View>
    )
}

export default Comment;