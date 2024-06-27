import { useNavigation } from '@react-navigation/native';
import { TCity } from '@type/city.type';
import { TabsScreenProps } from '@type/navigator.type';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

interface ICitySearch {
    press: () => void;
    city: TCity;
}

const CitySearch = ({ press, city }: ICitySearch) => {
    return (
        <TouchableOpacity onPress={press} className='w-full flex-col space-y-2 my-2'>
            <View className='flex flex-row space-x-3'>
                <View className='items-center justify-center'>
                    <Image
                        source={{ uri: `${city.cityUrl}` }}
                        style={{ width: 80, height: 80 }}
                        className='rounded-xl'
                    />
                </View>
                <View className='flex flex-col justify-evenly'>
                    <Text className='text-primary font-medium text-lg'>{city.cityName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CitySearch;