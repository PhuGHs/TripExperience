import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';


const ArrowButton = ({ icon: Icon, name, press}) => {
    return (
        <TouchableOpacity
            onPress={press}
            className='flex flex-row py-5 items-center justify-center'
        >
            <View className='w-[12%] items-start justify-center'>
                <Icon color='#1e1e1e' size={27} />
            </View>
            <Text className='w-[60%] items-start justify-center text-primary font-medium text-lg'>{name}</Text>
            <View className='w-[28%] items-end justify-center'>
                <ChevronRightIcon size={24} color='#1e1e1e' />
            </View>
        </TouchableOpacity>
    );
};

export default ArrowButton;