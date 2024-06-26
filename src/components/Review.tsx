import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TFeedback } from '@type/feedback.type';
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IFeedback {
    feedback: TFeedback
}

const Review = ({ feedback }: IFeedback) => {
    const { user, feedbackMedias, feedbackRate, tripType, feedbackContent, feedbackDate } = feedback;
    return (
        <View className='w-full my-4'>
            <View className='flex flex-row space-x-3'>
                <View className='w-[18%] items-center'>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{ width: 65, height: 65, borderRadius: 65 / 2 }}
                    />
                </View>
                <View className='flex flex-col justify-around max-w-[47%]'>
                    <View className='flex flex-row space-x-2 items-center'>
                        <Text className='text-primary font-medium text-lg'>{user.userName}</Text>
                        <View className='flex flex-row items-center'>
                            <Text className='text-lg font-bold text-primary'>{feedbackRate}</Text>
                            <FontAwesomeIcon icon={faStar} color='#FAA300' size={20} />
                        </View>
                    </View>
                    <Text className='text-primary font-light'>đã đến vào 10 ngày trước</Text>
                </View>
                <View className='w-[35%] items-center justify-center'>
                    <Text className='text-primary'>1 ngày trước</Text>
                </View>
            </View>
            <View className='my-2'>
                <Text className='text-[#7F7F81] text-base'>
                    {feedbackContent}
                </Text>
            </View>
            <View className='flex flex-row space-x-2'>
                <View className='w-[49%]'>
                    <Image
                        source={{uri: feedbackMedias[0].feedbackMediaUrl}}
                        style={{ width: '100%', height: 150 }}
                        className='rounded-xl'
                    />
                </View>
                <View className='w-[49%]'>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{ width: '100%', height: 150 }}
                        className='rounded-xl'
                    />
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']}
                        style={styles.gradient}
                    />
                    <View className='absolute w-full h-full items-center justify-center'>
                        <Text className='text-white font-bold text-base'>Xem thêm</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
});

export default Review;
