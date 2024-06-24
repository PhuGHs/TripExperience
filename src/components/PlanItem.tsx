import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IPlanItem {
    press: () => void;
    item: PlanningItem;
}

export type PlanningItem = {
    index: number;
    destination: string;
};

const PlanItem = ({ press, item }: IPlanItem) => {
    return (
        <View className='mb-7'>
            <View className='flex-row gap-[10px] mb-3'>
                <Image
                    source={require('@asset/images/benthanh.jpg')}
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                />
                <View className='flex-col flex-1'>
                    <View className='w-[80px] border-2 border-black py-[3px] mb-1 rounded items-center'>
                        <Text className='text-primary font-medium text-sm'>ĐIỂM ĐẾN</Text>
                    </View>
                    <Text className='text-primary font-medium'>Tỉnh {item.destination}</Text>
                </View>
            </View>
            <Text className='font-bold mb-3'>Thêm nhận xét</Text>
            <View className='border-b border-[#E3E1D9] w-full' />
        </View>
    );
};

export default PlanItem;
