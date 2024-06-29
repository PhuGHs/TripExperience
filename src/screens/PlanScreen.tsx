import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Plan from '@component/Plan';
import { TabsScreenProps } from '@type/navigator.type';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { TPlan, TPlanToPost } from '@type/plan.type';
import { PlanApi } from '@api/plan.api';
import { UserContext } from '@context/user-context';
import { useFocusEffect } from '@react-navigation/native';

const PlanScreen = ({ navigation }: TabsScreenProps) => {
    const { user } = useContext(UserContext);
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [plan, setPlan] = useState<TPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [planName, setPlanName] = useState<string>("");

    useFocusEffect(
        useCallback(() => {
            const fetchAPI = async () => {
                try {
                    const { data } = await PlanApi.getTravelPlan(user.id);
                    console.log("data: ", data);
                    setPlan(data);
                    setLoading(false);
                }
                catch (err) {
                    console.log("err: ", err);
                    setLoading(false);
                }
            }

            fetchAPI()
            return () => {
                sheetRef.current.close();
            }
        }, [])
    )

    const HandleAddPlan = async () => {
        try {
            const body: TPlanToPost = {
                travelPlanName: planName,
                travelDescription: "",
                travelUrl: "http://res.cloudinary.com/dx6aim1qs/image/upload/v1719584795/IMG_20240521_212035.jpg",
                userId: user.id,
            }
            const { data } = await PlanApi.addTravelPlan(body);
            navigation.push('PlanDetails', { planId: data.travelPlanId })
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    const renderHeader = () => (
        <View className='flex-row justify-start mb-10'>
            <Text className='text-3xl text-primary font-bold'>Lập kế hoạch</Text>
        </View>
    )
    return (
        <>
            <SafeAreaView className='flex flex-1 h-full w-full'>
                {
                    loading ? <ActivityIndicator size="small" color="#FF6F61" />
                        : <>
                            <View className='h-full'>
                                <View className='px-5'>
                                    <View className='flex-col mt-5'>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            ListHeaderComponent={renderHeader}
                                            data={plan}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => <Plan plan={item}
                                                press={() => navigation.push('PlanDetails', { planId: item.travelPlanId })} />}
                                        />
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity className='absolute inset-x-5 bottom-0 bg-main px-10 py-4 rounded-full items-center justify-center mb-2'
                                onPress={() => sheetRef.current?.open()}
                            >
                                <Text className='font-bold text-white'>Tạo Chuyến đi</Text>
                            </TouchableOpacity>
                        </>
                }

            </SafeAreaView>
            <BottomSheet ref={sheetRef} height="43%">
                <View className='h-full'>
                    <Text className='text-center text-primary font-bold text-base mb-5'>Tạo Chuyến đi</Text>
                    <View className='px-5 mb-5'>
                        <Text className='text-primary font-bold mb-2'>Tên chuyến đi</Text>
                        <TextInput className="border-[2px] border-black rounded px-3 py-2 text-primary font-bold"
                            placeholder='Ví dụ: Cuối tuần ở NYC'
                            value={planName}
                            onChangeText={(e) => setPlanName(e)}
                        />
                    </View>
                    <View className='border-b border-[#E3E1D9] w-full mb-3' />
                    <View className='px-5 items-end'>
                        <TouchableOpacity className='w-[120px] py-3 rounded-full items-center justify-center bg-main'
                            onPress={() => HandleAddPlan()}
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
