import Chip from '@component/Chip';
import RatingProgress, { Rating } from '@component/RatingProgress';
import Review from '@component/Review';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { StarIcon } from 'react-native-heroicons/solid';
import { dates, formatRating, getTotalFeedback, kinds, stars } from '@root/static/rating.static';
import { TFeedback } from '@type/feedback.type';
import { FeedbackApi } from '@api/feedback.api';
import { LocationApi } from '@api/location.api';
import { TRatingFilter, TStarFilter } from '@type/rating.type';
import { ToastOptions, toast } from '@baronha/ting';

const updateSelection = (items, id) => {
    return items.map(item => ({
        ...item,
        selected: item.id === id,
    }));
};

const ReviewScreen = ({
    route,
    navigation,
}: ReviewScreenScreenProps & { route: RouteProp<RootStackParamList, 'ReviewScreen'> }) => {
    const { ratingStatistic, destinationId, ratingAverage, locationName } = route.params;
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);
    const [selectedKinds, setSelectedKinds] = useState<TRatingFilter[]>(kinds);
    const [selectedDates, setSelectedDates] = useState<TRatingFilter[]>(dates);
    const [selectedStars, setSelectedStars] = useState<TStarFilter[]>(stars);
    
    const handleSelect = (id: number, type: 'kind' | 'date' | 'star') => {
        if (type === 'kind') {
            setSelectedKinds(prev => updateSelection(prev, id));
        } else if (type === 'date') {
            setSelectedDates(prev => updateSelection(prev, id));
        } else if (type === 'star') {
            setSelectedStars(prev => updateSelection(prev, id));
        }
    };

    const handleFilter = async () => {
        const selectedRating = selectedStars.find((item, index) => item.selected === true);
        const selectedDate = selectedDates.find((item, index) => item.selected === true);
        const selectedKind = selectedKinds.find((item, index) => item.selected === true);
        try {
            const { data, message } = await FeedbackApi.filterFeedbacks(selectedRating.id, selectedDate ? selectedDate.id : 0, selectedKind ? selectedKind.id : 0);
            setFeedbacks(data);
            const options: ToastOptions = {
                title: 'Đã lọc',
                message: 'Bạn xem ngay nhé!',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            sheetRef.current.close();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await LocationApi.getFeedbacks(destinationId);
                setFeedbacks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    const renderHeader = () => (
        <View className='flex flex-1 space-y-3 mt-4'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-xl'>{locationName}</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faInfoCircle} size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View className='items-center justify-center space-y-3'>
                <Text className='text-primary font-bold text-4xl text-center'>{ratingAverage}</Text>
                <StarRating rating={ratingAverage} color='#FAA300' onChange={() => {}} />
                <Text className='text-secondary font-bold text-lg text-center'>
                    {getTotalFeedback(ratingStatistic) === 0 ? 'Chưa có ai đánh giá' : `dựa vào ${getTotalFeedback(ratingStatistic)} đánh giá`}
                </Text>
            </View>
            <View className='flex flex-col border-b-[1px] border-[#7F7F81] py-3'>
                {formatRating(ratingStatistic).map((item, index) => (
                    <RatingProgress rating={item} key={index} />
                ))}
            </View>
            <View className='items-start justify-center border-b-[1px] border-[#7F7F81]'>
                <Chip
                    isSelected={false}
                    press={() => {
                        sheetRef.current?.open();
                    }}
                >
                    <View className='flex flex-row space-x-2 items-center justify-center'>
                        <AdjustmentsHorizontalIcon color='#1E1E1E' size={24} />
                        <Text className='text-primary font-bold'>Bộ lọc</Text>
                    </View>
                </Chip>
            </View>
            {feedbacks.length === 0 && <Text className='text-base'>Địa điểm này hiện chưa có bài đánh giá nào.</Text>}
        </View>
    );

    return (
        <SafeAreaView className='flex-1 px-4'>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={feedbacks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Review feedback={item} key={index} />}
            />
            <>
                <BottomSheet ref={sheetRef} height='100%' style={{ backgroundColor: 'white' }}>
                    <View className='h-full'>
                        <Text className='h-[5%] text-center text-primary font-medium text-lg mb-6'>
                            Bộ lọc
                        </Text>
                        <ScrollView className='px-4 space-y-5 h-[80%]'>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>
                                    Xếp hạng của khách du lịch
                                </Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {selectedStars.map((item, index) => {
                                        return (
                                            <Chip isSelected={item.selected} key={index} press={() => handleSelect(item.id, 'star')}>
                                                <View className='flex flex-row space-x-1 items-center'>
                                                    <Text className='text-primary text-base font-medium'>
                                                        {item.star}
                                                    </Text>
                                                    <StarIcon color='#FAA300' size={25} />
                                                </View>
                                            </Chip>
                                        );
                                    })}
                                </View>
                            </View>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>
                                    Ngày đánh giá
                                </Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {selectedDates.map((item, index) => {
                                        return (
                                            <Chip isSelected={item.selected} key={index} press={() => handleSelect(item.id, 'date')}>
                                                <View className='flex flex-row space-x-1 items-center'>
                                                    <Text className='text-primary font-medium text-base'>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </Chip>
                                        );
                                    })}
                                </View>
                            </View>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>
                                    Loại hình chuyến đi
                                </Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {selectedKinds.map((item, index) => {
                                        return (
                                            <Chip isSelected={item.selected} key={index} press={() => handleSelect(item.id, 'kind')}>
                                                <View className='flex flex-row space-x-1 items-center'>
                                                    <Text className='text-primary font-medium text-base'>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </Chip>
                                        );
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                        <View className='bg-white border-t-[1px] border-zinc-400 h-[15%]'>
                            <View className='flex flex-row items-center h-[70%] justify-between px-6'>
                                <TouchableOpacity className=''>
                                    <Text
                                        className='text-primary font-medium text-base'
                                        style={{ textDecorationLine: 'underline' }}
                                    >
                                        Xoá bộ lọc
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleFilter}
                                    className='bg-main rounded-full px-2 py-3'>
                                    <Text className='text-white font-medium text-base'>
                                        Hiển thị đánh giá
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BottomSheet>
            </>
        </SafeAreaView>
    );
};

export default ReviewScreen;
