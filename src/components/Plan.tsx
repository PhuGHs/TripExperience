import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IPlan {
    press: () => void;
}

const Plan = ({ press }: IPlan) => {
    return (
        <View className='mb-7'>
            <TouchableOpacity className='mb-2'
                onPress={press}
            >
                <Image source={require('@asset/images/benthanh.jpg')}
                    style={{ height: 150, width: "100%", borderRadius: 10 }}
                />
            </TouchableOpacity>
            <Text className='mb-2 font-bold text-primary'>Chill with bros</Text>
            <Text className='font-medium text-primary'>10 tháng 5</Text>
        </View>
    )
}

export default Plan;