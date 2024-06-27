import React, { useEffect, useState } from "react";
import { GroupDetailScreenProps, RootStackParamList } from "@type/navigator.type";
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import FamousDestination from "@component/FamousDestination";
import ReviewDestination from "@component/ReviewDestination";
import { TCity } from "@type/city.type";
import { CityApi } from "@api/city.api";
import { TLocation } from "@type/location.type";
import { LocationApi } from "@api/location.api";

const arr: Number[] = [1, 2, 3, 4, 5]

const GroupDetailScreen = ({
    route,
    navigation,
}: GroupDetailScreenProps & { route: RouteProp<RootStackParamList, 'GroupDetailScreen'> }) => {
    const { groupId } = route.params;
    const [city, setCity] = useState<TCity>(null);
    const [location, setLocation] = useState<TLocation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const { message, data } = await CityApi.getDetail(groupId);
                setCity(data);
                const { data: locations } = await LocationApi.getLocationByCity(groupId);
                setLocation(locations);
                setLoading(false);
            }
            catch (error) {
                console.log("Err: ", error);
                setLoading(false);
            }
        }

        fetchAPI();
    }, [])

    const renderHeader = () => (
        <>
            <View className="flex flex-row items-center mt-2 mb-5">
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
                <Text className="flex-1 text-center mr-[20px] text-primary text-xl font-bold">{city.cityName}</Text>
            </View>

            <View className=' mb-4'>
                <Text className='font-bold text-primary text-xl mb-1'>Các địa điểm nổi bật</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={location}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <FamousDestination destination={item}
                        press={() => navigation.push('DestinationDetails', { destinationId: 1 })} />}
                />
            </View>
            <View>
                <Text className='font-bold text-primary text-xl'>Các bài chia sẻ kinh nghiệm</Text>
                <TouchableOpacity className="w-[150px] border-2 border-[#FF6F61] px-2 py-[7px] mt-2 rounded-2xl justify-center items-center"
                    onPress={() => navigation.navigate('NewPostScreen')}
                >
                    <Text className="text-main">Thêm một bài viết</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    return (
        <SafeAreaView className="flex flex-1 h-full w-full">
            {
                loading ? <ActivityIndicator size="small" color="#FF6F61" />
                    : <FlatList
                        style={{ paddingHorizontal: 16 }}
                        ListHeaderComponent={renderHeader}
                        showsVerticalScrollIndicator={false}
                        data={arr}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <ReviewDestination press={() => navigation.push('PostDetailScreen', { postId: 1 })} />}
                    />
            }


        </SafeAreaView>
    )
}

export default GroupDetailScreen;