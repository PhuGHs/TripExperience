import React, { useRef, useState } from "react";
import { PlanDetailsScreenProps } from "@type/navigator.type";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@type/navigator.type';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft, faCalendarDays, faHeart, faPen, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import PlanItem, { PlanningItem } from "@component/PlanItem";
import { PencilIcon, UserPlusIcon } from "react-native-heroicons/outline";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Helper } from "@root/helpers";
import dayjs from 'dayjs';

const arr: PlanningItem[] = [
    {
        index: 1,
        destination: "Bình Dương"
    },
    {
        index: 2,
        destination: "Hà Tĩnh"
    },
    {
        index: 3,
        destination: "Quảng Trị"
    },
    {
        index: 4,
        destination: "Quảng Ngãi"
    },
]

const arrEmpty: PlanningItem[] = []

const PlanDetails = ({
    route,
    navigation,
}: PlanDetailsScreenProps & { route: RouteProp<RootStackParamList, 'PlanDetails'> }) => {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [date, setDate] = useState<DateType>(dayjs());
    const [dateString, setDateString] = useState<string>(Helper.formatDDMMYYYY(dayjs().toString()));

    return (
        <>
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
                        <TouchableOpacity onPress={() => navigation.navigate("UpdatePlan")}>
                            <PencilIcon size={20} color="#1e1e1e" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView className="px-4 my-3">
                    <Text className="font-bold text-xl text-primary">Chill with bros</Text>
                    <Text className="my-1 text-primary">Của Hoàng Phúc - 4 mục</Text>
                    <View className="flex flex-row space-x-2">
                        {
                            arrEmpty.length && <TouchableOpacity className="flex-row border-2 border-slate-400 w-[110px] px-2 py-[7px] mt-2 rounded-2xl justify-center items-center"
                            >
                                <Text className="font-medium text-primary ml-[5px]">{dateString}</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity className="flex-row border-2 border-slate-400 w-[160px] px-2 py-[7px] mt-2 rounded-2xl justify-center items-center"
                            onPress={() => sheetRef.current?.open()}
                        >
                            <FontAwesomeIcon icon={faCalendarDays} size={15} />
                            <Text className="font-medium text-primary ml-[5px]">Thêm ngày du lịch</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-5">
                        {arrEmpty.length > 0 ? arr.map((item, index) => (
                            <PlanItem item={item} key={index} press={() => { }} />
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
                //onPress={() => navigation.navigate("SearchScreen")}
                >
                    <FontAwesomeIcon icon={faPlus} size={25} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
            <BottomSheet ref={sheetRef} height='60%'>
                <View>
                    <DateTimePicker
                        selectedItemColor='#FF6F61'
                        mode="single"
                        date={date}
                        locale={dayjs.locale('vn')}
                        onChange={(params) => {
                            setDate(params.date);
                            setDateString(Helper.formatDDMMYYYY(params.date.toString()));
                        }}
                    />
                </View>
            </BottomSheet>
        </>

    )
}

export default PlanDetails;