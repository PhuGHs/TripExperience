import PersonalRating from '@component/PersonalRating';
import Review from '@component/Review';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ProfileScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Image, FlatList } from 'react-native';
import { MapPinIcon, PencilIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal/dist/modal';
import { useInput } from '@hook/useInput';
import { TFeedback } from '@type/feedback.type';
import { FeedbackApi } from '@api/feedback.api';
import { UserContext } from '@context/user-context';

const ProfileScreen = ({
    route,
    navigation,
}: ProfileScreenScreenProps & { route: RouteProp<RootStackParamList, 'ProfileScreen'> }) => {
    const { user } = useContext(UserContext);
    const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await FeedbackApi.getUserFeedbacks(user.id);
                setFeedbacks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);
    return (
        <SafeAreaView className='flex flex-1 mx-4 mt-4'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px]'>Hồ sơ</Text>
                <TouchableOpacity onPress={() => navigation.push('EditProfileScreen')}>
                    <PencilIcon size={24} color='#1e1e1e' />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className='space-y-6 border-b-[1.5px] border-gray-400 mb-6'>
                    <View className='mt-6 flex flex-row space-x-4'>
                        <View>
                            <Image
                                source={{ uri: user.avatar }}
                                style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                            />
                        </View>
                        <View className='flex flex-col justify-evenly'>
                            <Text className='text-primary text-xl font-bold'>{user.userName}</Text>
                            <Text className='text-base text-primary'>Đã tham gia vào 2024</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text className='text-gray-600 text-lg'>
                            {user.userDescription ? user.userDescription : 'Hãy chia sẻ một chút về bản thân để những khách du lịch khác có thể tìm hiểu về bạn!'}
                        </Text>
                    </TouchableOpacity>
                    <View className='mb-6 flex flex-row space-x-3 items-center'>
                        <MapPinIcon size={25} color='#1e1e1e' />
                        <Text className='text-primary text-base'>{user.city ? user.city.cityName + ', ' : ''}Việt Nam</Text>
                    </View>
                </View>
                <View className='space-y-4 border-b-[1.5px] border-gray-400 pb-6'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-primary font-bold text-2xl'>{feedbacks.length} đánh giá</Text>
                        <TouchableOpacity>
                            <Text
                                className='text-primary text-lg font-bold'
                                style={{ textDecorationLine: 'underline' }}
                            >
                                Xem tất cả
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <FlatList
                        data={feedbacks}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => <Review feedback={item} key={index} />}
                    /> */}
                    <TouchableOpacity className='w-full py-4 border-2 rounded-full'>
                        <Text className='text-primary text-center text-lg font-bold'>
                            Viết đánh giá
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className='space-y-4 border-b-[1.5px] border-gray-400 pb-6 mt-6'>
                    <Text className='text-primary font-bold text-2xl'>0 bài đăng</Text>
                    <Text className='text-primary text-base text-center'>
                        Bạn chưa có bài đăng trên diễn đàn.
                    </Text>
                    <TouchableOpacity className='w-full py-4 border-2 rounded-full'>
                        <Text className='text-primary text-center text-lg font-bold'>
                            Viết đánh giá
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
