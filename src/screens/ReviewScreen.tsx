import Chip from '@component/Chip';
import RatingProgress, { Rating } from '@component/RatingProgress';
import Review from '@component/Review';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const arr: Rating[] = [
    {
        index: 0,
        type: 'Xuất xắc',
        percentage: 70
    },
    {
        index: 1,
        type: 'Rất tốt',
        percentage: 20
    },
    {
        index: 2,
        type: 'Trung bình',
        percentage: 10
    },
    {
        index: 3,
        type: 'Tồi',
        percentage: 8
    },
    {
        index: 4,
        type: 'Tồi tệ',
        percentage: 2
    },
];

const ReviewScreen = ({
    route,
    navigation,
}: ReviewScreenScreenProps & { route: RouteProp<RootStackParamList, 'ReviewScreen'> }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
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
                <Text className='text-primary font-bold text-[22px]'>Chợ Bến Thành</Text>
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
                {arr.map((item, index) => (
                    <RatingProgress rating={item} key={index} />
                ))}
            </View>
            <View className='items-start justify-center border-b-[1px] border-[#7F7F81]'>
                <Chip icon={AdjustmentsHorizontalIcon} name='Bộ lọc' press={handlePresentModalPress}/>
            </View>
        </View>
    );

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className='flex-1 mx-4'>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    data={arr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <Review />}
                />
                <BottomSheetModal
                    backdropComponent={(props) => <BottomSheetBackdrop {...props} opacity={0.7} />}
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={() => {}}
                >
                    <BottomSheetView>
                        <Text className='text-cyan-600 font-nunitoBold text-xl h-[10%]'>
                            Filter discussions
                        </Text>
                        <View className='flex flex-col justify-between h-[85%]'>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};

export default ReviewScreen;
