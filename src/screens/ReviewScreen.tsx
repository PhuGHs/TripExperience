import RatingProgress, { Rating } from '@component/RatingProgress';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
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
    return (
        <SafeAreaView className='flex flex-1 space-y-3 mx-4'>
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
            <ScrollView>
                <View className='items-center justify-center space-y-3'>
                    <Text className='text-primary font-bold text-4xl text-center'>4.0</Text>
                    <StarRating rating={4.5} color='#FAA300' onChange={() => {}}/>
                    <Text className='text-secondary font-bold text-lg text-center'>Dựa vào 23 đánh giá</Text>
                </View>
                <View className='flex flex-col my-4'>
                    {arr.map((item, index) => {
                        return <RatingProgress rating={item} key={index}/>;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewScreen;