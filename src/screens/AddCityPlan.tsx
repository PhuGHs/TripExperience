import { CityApi } from "@api/city.api";
import { PlanApi } from "@api/plan.api";
import { ToastOptions, toast } from "@baronha/ting";
import CitySearch from "@component/CitySearch";
import PersonalRating from "@component/PersonalRating";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RouteProp } from "@react-navigation/native";
import { TCity } from "@type/city.type";
import { TLocation, TSearch } from "@type/location.type";
import { AddCityPlanProps, RootStackParamList } from "@type/navigator.type";
import { TPlanAddLocation } from "@type/plan.type";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const arr: number[] = [1, 2, 3];

const AddCityPlan = ({
    route,
    navigation,
}: AddCityPlanProps & { route: RouteProp<RootStackParamList, 'AddCityPlan'> }) => {
    const { planId } = route.params;
    const [results, setResults] = useState<TSearch<TLocation | TCity>[]>([]);
    const [searchParam, setSearchParam] = useState<string>("");
    const [locationId, setLocationId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleTextChange = async (searchParam) => {
        setLoading(true);
        const { data } = await CityApi.search(searchParam);
        setResults(data);
        setLoading(false);
        console.log(searchParam);
    };

    const HandleAddCityPlan = async (item: TLocation) => {
        try {
            const body: TPlanAddLocation = {
                planDetailDescription: "",
                locationId: item.locationId,
                travelPlanId: planId,
            }
            const { data } = await PlanApi.addLocation(body);
            const options: ToastOptions = {
                title: 'Thêm địa điểm thành công',
                message: 'Chuyến đi của bạn đã được chỉnh sửa',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            navigation.navigate("PlanDetails", { planId: planId });
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
        <SafeAreaView className='flex flex-1 mx-4 space-y-4 mt-4'>
            <View className='items-start'>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'
                >
                    <FontAwesomeIcon icon={faAngleLeft} size={30} />
                </TouchableOpacity>
            </View>
            <Text className='text-primary font-bold text-3xl'>Bạn muốn đi đâu?</Text>
            <SearchBar
                style={{ height: 55, width: '100%' }}
                textInputStyle={{ fontSize: 18 }}
                className='bg-gray-200 rounded-full font-nunitoSemi'
                placeholderTextColor='#6b7280'
                placeholder='Tìm kiếm'
                spinnerVisibility={false}
                returnKeyType='search'
                onChangeText={handleTextChange}
            />
            {
                loading ? <ActivityIndicator size="small" color="#FF6F61" />
                    : <FlatList
                        showsVerticalScrollIndicator={false}
                        data={results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (item.isLocation) {
                                return <PersonalRating location={item.result as TLocation}
                                    press={() => HandleAddCityPlan(item.result as TLocation)} />;
                            }
                            return;
                        }}
                    />
            }

        </SafeAreaView>
    )
}

export default AddCityPlan;