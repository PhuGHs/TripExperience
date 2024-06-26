import { useNavigation } from '@react-navigation/native';
import { TLocation } from '@type/location.type';
import { TabsScreenProps } from '@type/navigator.type';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

interface IPersonalRating {
    press: () => void;
    location: TLocation
}

const PersonalRating = ({ press, location }: IPersonalRating) => {
    return (
        <TouchableOpacity onPress={press} className='w-full flex-col space-y-2 my-2'>
            <View className='flex flex-row space-x-3'>
                <View className='items-center justify-center'>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{ width: 80, height: 80 }}
                        className='rounded-xl'
                    />
                </View>
                <View className='flex flex-col justify-evenly'>
                    <Text className='text-primary font-medium text-lg'>{location.locationName}</Text>
                    <Text className='text-primary text-base'>{location.cityName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PersonalRating;
