import React from 'react';
import { View, Text } from 'react-native';

export type Rating = {
    index: number,
    type: 'Excellent' | 'Good' | 'Average' | 'Bad' | 'Poor',
    percentage: number
}

interface IRatingProgress {
    rating: Rating
}

const getColor = (type: 'Excellent' | 'Good' | 'Average' | 'Bad' | 'Poor') => {
    switch (type) {
        case 'Excellent':
            return '#41B06E';
        case 'Good':
            return '#92FF39';
        case 'Average':
            return '#FCDC2A';
        case 'Bad':
            return '#FDA403';
        case 'Poor':
            return '#FD0303';
        default:
            return '#000000'; // Default color for unknown types
    }
};

const RatingProgress = ({ rating }: IRatingProgress) => {
    
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
            <View style={{ width: '20%' }}>
                <Text style={{ color: '#555555', fontSize: 16 }}>{rating.type}</Text>
            </View>
            <View style={{ width: '75%', height: 10, backgroundColor: '#CCCCCC' }}>
                <View style={{ height: '100%', width: `${rating.percentage}%`, backgroundColor: getColor(rating.type), position: 'absolute', left: 0 }}></View>
            </View>
        </View>
    );
};

export default RatingProgress;
