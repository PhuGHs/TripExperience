import React from 'react';
import { View, Text } from 'react-native';

export type Rating = {
    index: number,
    type: 'Xuất xắc' | 'Rất tốt' | 'Trung bình' | 'Tồi' | 'Tồi tệ',
    percentage: number
}

interface IRatingProgress {
    rating: Rating
}

const RatingProgress = ({ rating }: IRatingProgress) => {
    
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
            <View style={{ width: '20%' }}>
                <Text style={{ color: '#555555', fontSize: 16 }}>{rating.type}</Text>
            </View>
            <View className='rounded-full' style={{ width: '75%', height: 10, backgroundColor: '#CCCCCC' }}>
                <View className='rounded-full' style={{ height: '100%', width: `${rating.percentage}%`, backgroundColor: '#FF6F61', position: 'absolute', left: 0 }}></View>
            </View>
        </View>
    );
};

export default RatingProgress;
