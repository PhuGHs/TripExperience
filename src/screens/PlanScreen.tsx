import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Plan from '@component/Plan';
import { TabsScreenProps } from '@type/navigator.type';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

const arr: number[] = [1, 2, 3, 4, 5, 6, 7];

const PlanScreen = ({ navigation }: TabsScreenProps) => {
    const sheetRef = useRef<BottomSheetMethods>(null);

    const renderHeader = () => (
        <View className='flex-row justify-start mb-10'>
            <Text className='text-3xl text-primary font-bold'>Lập kế hoạch</Text>
        </View>
    )
    return (
        <>
            <SafeAreaView className='flex flex-1 h-full w-full'>
                <View className='h-full'>
                    <View className='px-5'>
                        <View className='flex-col mt-5'>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponent={renderHeader}
                                data={arr}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <Plan press={() => navigation.push('PlanDetails', { planId: 1 })} />}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity className='absolute inset-x-5 bottom-0 bg-main px-10 py-4 rounded-full items-center justify-center mb-2'
                    onPress={() => sheetRef.current?.open()}
                >
                    <Text className='font-bold text-white'>Tạo Chuyến đi</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <BottomSheet ref={sheetRef} height="43%">
                <View className='h-full'>
                    <Text className='text-center text-primary font-bold text-base mb-5'>Tạo Chuyến đi</Text>
                    <View className='px-5 mb-5'>
                        <Text className='text-primary font-bold mb-2'>Tên chuyến đi</Text>
                        <TextInput className="border-[2px] border-black rounded px-3 py-2 text-primary font-bold"
                            placeholder='Ví dụ: Cuối tuần ở NYC'
                        />
                    </View>
                    <View className='border-b border-[#E3E1D9] w-full mb-3' />
                    <View className='px-5 items-end'>
                        <TouchableOpacity className='w-[120px] py-3 rounded-full items-center justify-center bg-main'
                            onPress={() => navigation.push('PlanDetails', { planId: 1 })}
                        >
                            <Text className='font-bold text-white'>Tạo Chuyến đi</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </BottomSheet>
        </>

    );
};

export default PlanScreen;