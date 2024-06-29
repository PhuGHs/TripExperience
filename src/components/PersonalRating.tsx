import { useNavigation } from '@react-navigation/native';
import { TCity } from '@type/city.type';
import { TLocation } from '@type/location.type';
import { TabsScreenProps } from '@type/navigator.type';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

interface IPersonalRating {
    press: () => void;
    location?: TLocation
    city?: TCity
}

const PersonalRating = ({ press, location, city }: IPersonalRating) => {
    if (location) {
        return (
            <TouchableOpacity onPress={press} className='w-full flex-col space-y-2 my-2'>
                <View className='flex flex-row space-x-3'>
                    <View className='items-center justify-center'>
                        <Image
                            source={{ uri: location.locationMedias[0].locationMediaUrl }}
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
    }
    return (
        <TouchableOpacity onPress={press} className='w-full flex-col space-y-2 my-2'>
            <View className='flex flex-row space-x-3'>
                <View className='items-center justify-center'>
                    <Image
                        source={{ uri: city.cityUrl }}
                        style={{ width: 80, height: 80 }}
                        className='rounded-xl'
                    />
                </View>
                <View className='flex flex-col justify-evenly'>
                    <Text className='text-primary font-medium text-lg'>{city.cityName}</Text>
                    <Text className='text-primary text-base' numberOfLines={1}>{city.cityDescription}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PersonalRating;
