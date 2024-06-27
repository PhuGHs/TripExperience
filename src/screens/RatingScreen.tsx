import { CityApi } from '@api/city.api';
import { FeedbackApi } from '@api/feedback.api';
import PersonalRating from '@component/PersonalRating';
import Province from '@component/Province';
import { UserContext } from '@context/user-context';
import { TCity } from '@type/city.type';
import { TFeedback } from '@type/feedback.type';
import { TabsScreenProps } from '@type/navigator.type';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const arr: number[] = [1, 2, 3, 4, 5, 6];

const RatingScreen = ({ navigation }: TabsScreenProps) => {
    const { user } = useContext(UserContext);
    const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);
    const [provinces, setProvinces] = useState<TCity[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await FeedbackApi.getUserFeedbacks(user.id);
                setFeedbacks(data);
                const { data: cities } = await CityApi.getProvinces(user.id);
                setProvinces(cities);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);
    const renderHeader = () => (
        <View className='space-y-3'>
            <View className='flex flex-col space-y-6'>
                <View className='flex flex-row space-x-5'>
                    <View className='w-[15%]'>
                        <Image
                            source={require('@asset/images/benthanh.jpg')}
                            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                        />
                    </View>
                    <View className='w-[80%] flex flex-col justify-around'>
                        <Text className='text-primary font-medium text-lg'>{user.userName}</Text>
                        <Text className='text-slate-700 text-base'>{feedbacks.length} Đánh giá</Text>
                    </View>
                </View>
                <View className='flex flex-row justify-between'>
                    <TouchableOpacity
                        onPress={() => navigation.push('SearchDestinationRatingScreen')}
                        className='w-[48%] items-center justify-center rounded-full border-[#1e1e1e] border-2 py-4'
                    >
                        <Text className='text-primary text-base font-bold'>Viết đánh giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[48%] items-center justify-center rounded-full border-[#1e1e1e] border-2 py-4'>
                        <Text className='text-primary text-base font-bold'>Xem đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text className='text-primary font-bold text-2xl'>Đánh giá của bạn</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className='flex flex-1 mx-4 h-full mt-4'>
            <View className='h-[10%]'>
                <Text className='text-primary text-3xl font-bold'>Đánh giá</Text>
            </View>
            <FlatList
                data={provinces}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                ListHeaderComponent={renderHeader}
                renderItem={({ item, index }) => (
                    <Province province={item} key={index} press={() => navigation.push('DestinationReviewScreen', {provinceId: item.cityId})} />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
};

export default RatingScreen;
