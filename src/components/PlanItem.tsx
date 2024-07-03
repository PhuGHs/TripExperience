import { LocationApi } from '@api/location.api';
import { TLocation, TLocationGet } from '@type/location.type';
import { TLocationMedia } from '@type/media.type';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IPlanItem {
    press: () => void;
    data: TLocationGet;
}

const PlanItem = ({ press, data }: IPlanItem) => {
    return (
        <View className='mb-7'>
            <View className='flex-row gap-[10px] mb-3'>
                <Image source={{ uri: `${data.locationMedias[0].locationMediaUrl}` }}
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                />
                <View className='flex-col flex-1 space-y-1'>
                    <View className='w-[80px] border-2 border-black py-[3px] mb-1 rounded items-center'>
                        <Text className='text-primary font-medium text-sm'>ĐIỂM ĐẾN</Text>
                    </View>
                    <Text className='text-primary font-bold'>{data.location.locationName}</Text>
                    <Text className='text-primary font-medium'>{data.location.locationAddress}</Text>
                </View>
            </View>
            <View className='border-b border-[#E3E1D9] w-full' />
        </View>
    );
};

export default PlanItem;
