import Chip from '@component/Chip';
import RatingProgress, { Rating } from '@component/RatingProgress';
import Review from '@component/Review';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { StarIcon } from 'react-native-heroicons/solid';
import { dates, kinds, ratings, stars } from '@root/static/rating.static';

const ReviewScreen = ({
    route,
    navigation,
}: ReviewScreenScreenProps & { route: RouteProp<RootStackParamList, 'ReviewScreen'> }) => {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const renderHeader = () => (
        <View className='flex flex-1 space-y-3 mt-4'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity 
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'>
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-xl'>Chợ Bến Thành</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faInfoCircle} size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View className='items-center justify-center space-y-3'>
                <Text className='text-primary font-bold text-4xl text-center'>4.0</Text>
                <StarRating rating={4} color='#FAA300' onChange={() => {}} />
                <Text className='text-secondary font-bold text-lg text-center'>dựa vào 23 đánh giá</Text>
            </View>
            <View className='flex flex-col border-b-[1px] border-[#7F7F81] py-3'>
                {ratings.map((item, index) => (
                    <RatingProgress rating={item} key={index} />
                ))}
            </View>
            <View className='items-start justify-center border-b-[1px] border-[#7F7F81]'>
                <Chip press={() => {sheetRef.current?.open();}}>
                    <View className='flex flex-row space-x-2 items-center justify-center'>
                    <AdjustmentsHorizontalIcon color='#1E1E1E' size={24} />
                    <Text className='text-primary font-bold'>Bộ lọc</Text>
            </View>
                </Chip>
            </View>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 px-4'>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    data={[1,2,3,4,5]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <Review />}
                />
                <>
                <BottomSheet ref={sheetRef} height='100%' style={{backgroundColor: 'white'}}>
                    <View className='h-full'>
                        <Text className='h-[5%] text-center text-primary font-medium text-lg mb-6'>
                            Bộ lọc
                        </Text>
                        <ScrollView className='px-4 space-y-5 h-[80%]'>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>Xếp hạng của khách du lịch</Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {stars.map((item, index) => {
                                        return <Chip key={index} press={() => {}}>
                                            <View className='flex flex-row space-x-1 items-center'>
                                                <Text className='text-primary text-base font-medium'>{item.star}</Text>
                                                <StarIcon color='#FAA300' size={25}/>
                                            </View>
                                        </Chip>;
                                    })}
                                </View>
                            </View>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>Ngày đánh giá</Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {dates.map((item, index) => {
                                        return <Chip key={index} press={() => {}}>
                                            <View className='flex flex-row space-x-1 items-center'>
                                                <Text className='text-primary font-medium text-base'>{item.name}</Text>
                                            </View>
                                        </Chip>;
                                    })}
                                </View>
                            </View>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>Loại hình chuyến đi</Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {kinds.map((item, index) => {
                                        return <Chip key={index} press={() => {}}>
                                            <View className='flex flex-row space-x-1 items-center'>
                                                <Text className='text-primary font-medium text-base'>{item.name}</Text>
                                            </View>
                                        </Chip>;
                                    })}
                                </View>
                            </View>
                            <View className='flex flex-col space-y-4'>
                                <Text className='text-primary text-lg font-semibold'>Loại hình chuyến đi</Text>
                                <View className='flex flex-wrap flex-row w-full'>
                                    {kinds.map((item, index) => {
                                        return <Chip key={index} press={() => {}}>
                                            <View className='flex flex-row space-x-1 items-center'>
                                                <Text className='text-primary font-medium text-base'>{item.name}</Text>
                                            </View>
                                        </Chip>;
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                        <View className='bg-white border-t-[1px] border-zinc-400 h-[15%]'>
                            <View className='flex flex-row items-center h-[70%] justify-between px-6'>
                                <TouchableOpacity className=''>
                                    <Text className='text-primary font-medium text-base' style={{textDecorationLine: 'underline'}}>Xoá bộ lọc</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='bg-main rounded-full px-2 py-3'>
                                    <Text className='text-white font-medium text-base'>Hiển thị đánh giá</Text>
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
