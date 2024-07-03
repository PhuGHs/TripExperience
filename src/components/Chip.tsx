import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Chip = ({ children, press, isSelected }) => {
    return (
        <TouchableOpacity
            onPress={press}
            className={`px-4 py-2 mr-2 mb-3 rounded-full border-2 items-start justify-center ${isSelected ? 'border-slate-700 bg-slate-200' : 'border-zinc-400'}`}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Chip;
