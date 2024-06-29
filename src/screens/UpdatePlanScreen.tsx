import React, { useContext, useEffect, useState } from "react";
import { UpdatePlanScreenProps } from "@type/navigator.type";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@type/navigator.type';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { TPlan, TPlanUpdate } from "@type/plan.type";
import { PlanApi } from "@api/plan.api";
import { UserContext } from "@context/user-context";
import { ToastOptions, toast } from "@baronha/ting";

const UpdatePlanScreen = ({
    route,
    navigation,
}: UpdatePlanScreenProps & { route: RouteProp<RootStackParamList, 'UpdatePlan'> }) => {
    const { planId } = route.params;
    const { user } = useContext(UserContext);
    const [plan, setPlan] = useState<TPlan>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [planName, setPlanName] = useState<string>("");
    const [planDescription, setPlanDescription] = useState<string>("");
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const { data } = await PlanApi.getPlanDetail(planId);
                setPlan(data);
                setPlanName(data.travelPlanName);
                setPlanDescription(data.travelDescription)
                setLoading(false);
            }
            catch (err) {
                console.log("err: ", err);
                setLoading(false);
            }
        }

        fetchAPI();
    }, [])

    const HandleUpdatePlan = async () => {
        try {
            const body: TPlanUpdate = {
                travelPlanId: planId,
                travelPlanName: planName,
                travelDescription: planDescription,
                travelUrl: "http://res.cloudinary.com/dx6aim1qs/image/upload/v1719584795/IMG_20240521_212035.jpg",
                userId: user.id,
            }
            const { data } = await PlanApi.updateTravelPlan(body);
            const options: ToastOptions = {
                title: 'Sửa chuyến đi thành công',
                message: 'Chuyến đi của bạn đã được chỉnh sửa',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            navigation.popToTop();
        }
        catch (error) {
            console.log(error);
            const options: ToastOptions = {
                title: 'Đã có lỗi xảy ra',
                message: 'Thử lại sau nhé!',
                preset: 'error',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
        }
    }

    return (
        <SafeAreaView className="flex-1 my-2">
            <View className="flex flex-row justify-start mx-4">
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
            </View>
            {
                loading ? <ActivityIndicator size="small" color="#FF6F61" />
                    : <>
                        <ScrollView className="px-4">
                            <Text className="mt-3 text-2xl text-primary font-bold">Sửa chuyến đi</Text>
                            <View className="mt-5">
                                <Text className="text-primary font-bold mb-2">Tên chuyến đi</Text>
                                <TextInput className="border-[2px] border-[#B0A695] rounded px-3 py-2 text-primary font-bold"
                                    value={planName}
                                    onChangeText={(e) => setPlanName(e)}
                                />
                            </View>
                            <View className="mt-5">
                                <Text className="text-primary font-bold mb-2">Mô tả</Text>
                                <TextInput className="h-[120px] border-[2px] border-[#B0A695] rounded px-3 py-3 text-primary font-bold"
                                    textAlignVertical="top"
                                    placeholder="Ví dụ: Chuyến đi chill chill cuối tuần"
                                    value={planDescription}
                                    onChangeText={(e) => setPlanDescription(e)}

                                />
                            </View>
                            <View className="mt-10">
                                <Text className="text-primary text-lg font-bold mb-2">Quyền sở hữu</Text>
                                <View className="flex-row items-center">
                                    <View className='items-center'>
                                        <View className='rounded-full border-[2px] border-white'>
                                            <Image
                                                source={{ uri: `${plan.user.avatar}` }}
                                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                            />
                                        </View>
                                    </View>
                                    <Text className="ml-3 text-primary font-bold">{plan.user.userName}</Text>
                                </View>
                            </View>
                        </ScrollView>
                        {
                            !isKeyboardVisible && <TouchableOpacity className='absolute inset-x-5 bottom-0 bg-main px-10 py-3 rounded-full items-center justify-center
                            mb-2'
                                onPress={() => HandleUpdatePlan()}
                            >
                                <Text className='font-bold text-lg text-white'>Lưu</Text>
                            </TouchableOpacity>
                        }

                    </>
            }

        </SafeAreaView>
    )
}

export default UpdatePlanScreen;