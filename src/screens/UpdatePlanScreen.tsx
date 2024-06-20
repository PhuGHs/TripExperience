import React from "react";
import { UpdatePlanScreenProps } from "@type/navigator.type";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@type/navigator.type';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const UpdatePlanScreen = ({
    route,
    navigation,
}: UpdatePlanScreenProps & { route: RouteProp<RootStackParamList, 'PlanDetails'> }) => {
    return (
        <SafeAreaView className="flex-1 my-2">
            <View className="flex flex-row justify-start mx-4">
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
            </View>
            <ScrollView className="px-4">
                <Text className="mt-3 text-2xl text-primary font-bold">Sửa chuyến đi</Text>
                <View className="mt-5">
                    <Text className="text-primary font-bold mb-2">Tên chuyến đi</Text>
                    <TextInput className="border-[2px] border-[#B0A695] rounded px-3 py-2 text-primary font-bold"
                        value="Chill with bros"
                    />
                </View>
                <View className="mt-5">
                    <Text className="text-primary font-bold mb-2">Mô tả</Text>
                    <TextInput className="h-[120px] border-[2px] border-[#B0A695] rounded px-3 py-3 text-primary font-bold"
                        textAlignVertical="top"
                        placeholder="Ví dụ: Chuyến đi chill chill cuối tuần"
                    />
                </View>
                <View className="mt-10">
                    <Text className="text-primary text-lg font-bold mb-2">Quyền sở hữu</Text>
                    <View className="flex-row items-center">
                        <View className='items-center'>
                            <View className='rounded-full border-[2px] border-white'>
                                <Image
                                    source={require('@asset/images/login.png')}
                                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                />
                            </View>
                        </View>
                        <Text className="ml-3 text-primary font-bold">Hoàng Phúc</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className='absolute inset-x-5 bottom-0 bg-main px-10 py-3 rounded-full items-center justify-center
            mb-2'>
                <Text className='font-bold text-lg text-white'>Lưu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default UpdatePlanScreen;