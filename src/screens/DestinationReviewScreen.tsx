import { FeedbackApi } from '@api/feedback.api';
import Review from '@component/Review';
import { UserContext } from '@context/user-context';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { TFeedback } from '@type/feedback.type';
import { DestinationReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const arr: number[] = [1, 2, 3, 4, 5];

const DestinationReviewScreen = ({
    route,
    navigation,
}: DestinationReviewScreenScreenProps & {
    route: RouteProp<RootStackParamList, 'DestinationReviewScreen'>;
}) => {
    const { provinceId, provinceName } = route.params;
    const { user } = useContext(UserContext);
    const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await FeedbackApi.getFeedbacksByUserIdAndCityId(user.id, provinceId);
                setFeedbacks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    const renderHeader = () => (
        <View className='flex flex-1 space-y-3'>
            <View className='flex flex-row justify-between items-center'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px]'>{provinceName}</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faInfoCircle} size={25} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 mx-4 mt-4'>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={feedbacks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Review feedback={item} key={index} />}
            />
        </SafeAreaView>
    );
};

export default DestinationReviewScreen;
