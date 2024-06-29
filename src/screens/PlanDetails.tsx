import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlanDetailsScreenProps } from "@type/navigator.type";
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '@type/navigator.type';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft, faCalendarDays, faHeart, faPen, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import PlanItem from "@component/PlanItem";
import { PencilIcon, UserPlusIcon } from "react-native-heroicons/outline";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Helper } from "@root/helpers";
import dayjs from 'dayjs';
import { TPlan, TPlanDetail } from "@type/plan.type";
import { PlanApi } from "@api/plan.api";
import { TLocation, TLocationGet } from "@type/location.type";

const PlanDetails = ({
    route,
    navigation,
}: PlanDetailsScreenProps & { route: RouteProp<RootStackParamList, 'PlanDetails'> }) => {
    const { planId } = route.params;
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [date, setDate] = useState<DateType>(dayjs());
    const [dateString, setDateString] = useState<string>(Helper.formatDDMMYYYY(dayjs().toString()));
    const [plan, setPlan] = useState<TLocationGet[]>([]);
    const [planInfo, setPlanInfo] = useState<TPlan>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            const fetchAPI = async () => {
                try {
                    const { data } = await PlanApi.getPlanDetail(planId);
                    setPlanInfo(data);
                    const { data: plans } = await PlanApi.getDetail(planId);
                    setPlan(plans);
                    console.log("plancheck: ", plans)
                    setLoading(false);
                }
                catch (err) {
                    console.log("err: ", err);
                    setLoading(false);
                }
            }

            fetchAPI();
            return () => {

            }
        }, [])
    )

    const formatDate = (date) => {
        const inputDate = new Date(date);

        const year = inputDate.getUTCFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDate.getDate().toString().padStart(2, "0");

        const time =
            inputDate.getHours().toString().padStart(2, "0") +
            ":" +
            inputDate.getMinutes().toString().padStart(2, "0");

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    return (

        <SafeAreaView className="flex-1 my-2">
            <View className="flex flex-row justify-between items-center mx-4">
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
                <View className="flex-row gap-5 items-center">
                    <TouchableOpacity onPress={() => { }}>
                        <UserPlusIcon size={20} color="#1e1e1e" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("UpdatePlan", { planId: planId })}>
                        <PencilIcon size={20} color="#1e1e1e" />
                    </TouchableOpacity>
                </View>
            </View>
            {
                loading ? <ActivityIndicator size="small" color="#FF6F61" />
                    :
                    <>
                        <ScrollView className="px-4 my-3">
                            <Text className="font-bold text-xl text-primary">{planInfo.travelPlanName}</Text>
                            <Text className="my-1 text-primary">Của {planInfo.user.userName} - {plan.length} mục</Text>
                            <View className="flex flex-row space-x-2">
                                <TouchableOpacity className="flex-row border-2 border-slate-400 w-[110px] px-2 py-[7px] mt-2 rounded-2xl justify-center items-center"
                                >
                                    <Text className="font-medium text-primary ml-[5px]">{formatDate(planInfo.travelDate)}</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="mt-5">
                                {plan.length > 0 ? plan.map((item, index) => (
                                    <PlanItem data={item} key={index} press={() => { }} />
                                )) :
                                    <View className="flex items-center px-3">
                                        <TouchableOpacity className="bg-[#096C47] w-[40px] h-[40px] rounded-full items-center justify-center mb-2">
                                            <FontAwesomeIcon icon={faHeart} size={20} color="white" />
                                        </TouchableOpacity>
                                        <Text className="font-bold text-primary mb-1">Thêm vào chuyến đi của bạn</Text>
                                        <Text className="text-primary mb-2 text-center leading-5">
                                            Tìm địa điểm du lịch và hoạt động giải trí, rồi nhấn vào để lưu các nội dung đó tại đây
                                        </Text>
                                    </View>
                                }
                            </View>
                        </ScrollView>
                        <TouchableOpacity className='absolute bottom-0 right-5 bg-main p-4 rounded-full items-center justify-center mb-2'
                            onPress={() => navigation.navigate("AddCityPlan", { planId: planId })}
                        >
                            <FontAwesomeIcon icon={faPlus} size={25} color="white" />
                        </TouchableOpacity>
                    </>
            }
        </SafeAreaView>


    )
}

export default PlanDetails;