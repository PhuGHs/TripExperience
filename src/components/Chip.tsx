import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Chip = ({ children, press }) => {
    return (
        <TouchableOpacity
            onPress={press}
            className='px-4 py-2 mr-2 mb-3 rounded-full border-2 border-zinc-400 items-start justify-center'
        >
            {children}
        </TouchableOpacity>
    );
};

export default Chip;
