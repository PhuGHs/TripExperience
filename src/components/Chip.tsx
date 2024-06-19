import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Chip = ({ icon: Icon, name: name, press}) => {
    return (
        <TouchableOpacity 
            onPress={press}
            className='px-4 py-2 mb-3 rounded-full border-2 border-zinc-400 items-start justify-center'>
            <View className='flex flex-row space-x-2 items-center justify-center'>
                <Icon color='#1E1E1E' size={24} />
                <Text className='text-primary font-bold'>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Chip;