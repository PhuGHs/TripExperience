import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Plan from '@component/Plan';
import { TabsScreenProps } from '@type/navigator.type';

const arr: number[] = [1, 2, 3, 4, 5, 6, 7];

const PlanScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <SafeAreaView className='flex flex-1 h-full w-full'>
            <ScrollView className='h-full'>
                <View className='px-5 pt-5'>
                    <View className='flex-row justify-start'>
                        <Text className='text-2xl text-primary font-bold'>Lập kế hoạch</Text>
                    </View>
                    <View className='flex-col mt-5'>
                        <Plan press={() => navigation.push('PlanDetails', { planId: 1 })} />
                        <Plan press={() => navigation.push('PlanDetails', { planId: 1 })} />
                        <Plan press={() => navigation.push('PlanDetails', { planId: 1 })} />
                        <Plan press={() => navigation.push('PlanDetails', { planId: 1 })} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className='absolute inset-x-5 bottom-0 bg-main px-10 py-4 rounded-full items-center justify-center
            mb-2'>
                <Text className='font-bold text-white'>Tạo Chuyến đi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PlanScreen;