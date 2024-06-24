import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

interface IReviewDestination {
    press: () => void;
}

const ReviewDestination = ({ press }: IReviewDestination) => {
    return (
        <TouchableOpacity
            className='bg-white w-[95%] p-3 rounded-2xl space-y-2 mr-5 ml-1 my-3'
            style={{ elevation: 2 }}
            onPress={press}
        >
            <View className='flex flex-row space-x-2'>
                <View>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                    />
                </View>
                <View className='items-start justify-around'>
                    <Text className='font-bold text-slate-700 text-lg'>Le Van Phu</Text>
                    <Text className='text-base italic'>22/06/2024</Text>
                </View>
            </View>
            <View>
                <Text className='text-slate-700 text-base mb-1'>
                    This iconic market is renowned for its wide array of goods, from traditional
                    Vietnamese handicrafts and souvenirs to fresh produce and delicious street food.
                </Text>
                <Text className='text-primary font-bold text-base'>tại Chợ Bến Thành</Text>
            </View>
            <View>
                <Image
                    source={require('@asset/images/benthanh.jpg')}
                    style={{ width: '100%', height: 300 }}
                    className='rounded-xl'
                />
            </View>
        </TouchableOpacity>
    );
};

export default ReviewDestination;
