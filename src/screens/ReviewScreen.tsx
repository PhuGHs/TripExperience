import RatingProgress, { Rating } from '@component/RatingProgress';
import Review from '@component/Review';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const arr: Rating[] = [
    {
        index: 0,
        type: 'Excellent',
        percentage: 70
    },
    {
        index: 1,
        type: 'Good',
        percentage: 20
    },
    {
        index: 2,
        type: 'Average',
        percentage: 10
    },
    {
        index: 3,
        type: 'Bad',
        percentage: 8
    },
    {
        index: 4,
        type: 'Poor',
        percentage: 2
    },
];

const ReviewScreen = ({
    route,
    navigation,
}: ReviewScreenScreenProps & { route: RouteProp<RootStackParamList, 'ReviewScreen'> }) => {

    const renderHeader = () => (
        <View className='flex flex-1 space-y-3'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity 
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'>
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px]'>Đánh giá</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faInfoCircle} size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View className='items-center justify-center space-y-3'>
                <Text className='text-primary font-bold text-4xl text-center'>4.0</Text>
                <StarRating rating={4} color='#FAA300' onChange={() => {}} />
                <Text className='text-secondary font-bold text-lg text-center'>dựa vào 23 đánh giá</Text>
            </View>
            <View className='flex flex-col border-b-[1px] border-[#7F7F81] py-6'>
                {arr.map((item, index) => (
                    <RatingProgress rating={item} key={index} />
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 mx-4'>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={arr}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Review />}
            />
        </SafeAreaView>
    );
};

export default ReviewScreen;
