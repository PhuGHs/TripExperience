import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Helper } from '@helper/index';
import { TFeedback } from '@type/feedback.type';
import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageView from 'react-native-image-viewing';
import { TFeedbackMedia } from '@type/media.type';
import { ImageViewType } from '@screen/DestinationDetails';

interface IFeedback {
    feedback: TFeedback
}

const convert = (images: TFeedbackMedia[]): ImageViewType[] => {
    const arr: ImageViewType[] = [];
    images.forEach((item, index) => {
        arr.push({uri: item.feedbackMediaUrl});
    });
    return arr;
};

const Review = ({ feedback }: IFeedback) => {
    const { user, feedbackMedias, feedbackRate, tripType, feedbackContent, feedbackDate } = feedback;
    const [visible, setVisible] = useState<boolean>(false);

    const renderImages = () => {
        const mediaCount = feedbackMedias.length;

        if (mediaCount === 0) {
            return null;
        }

        if (mediaCount === 1) {
            return (
                <TouchableOpacity onPress={() => setVisible(true)} style={{ width: '100%' }}>
                    <Image
                        source={{ uri: feedbackMedias[0].feedbackMediaUrl }}
                        style={{ width: '100%', height: 200 }}
                        resizeMode='cover'
                        className='rounded-xl'
                    />
                    <ImageView
                            images={convert(feedbackMedias)}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                        />
                </TouchableOpacity>
            );
        }

        if (mediaCount === 2) {
            return (
                <TouchableOpacity onPress={() => setVisible(true)} className='flex flex-row space-x-2'>
                    <View style={{ width: '49%' }}>
                        <Image
                            source={{ uri: feedbackMedias[0].feedbackMediaUrl }}
                            style={{ width: '100%', height: 150 }}
                            resizeMethod='scale'
                            className='rounded-xl'
                        />
                    </View>
                    <View style={{ width: '49%' }}>
                        <Image
                            source={{ uri: feedbackMedias[1].feedbackMediaUrl }}
                            style={{ width: '100%', height: 150 }}
                            resizeMethod='scale'
                            className='rounded-xl'
                        />
                    </View>
                    <ImageView
                            images={convert(feedbackMedias)}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                        />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => setVisible(true)}
                className='flex flex-row space-x-2'>
                <View style={{ width: '49%' }}>
                    <Image
                        source={{ uri: feedbackMedias[0].feedbackMediaUrl }}
                        style={{ width: '100%', height: 150 }}
                        className='rounded-xl'
                    />
                </View>
                <View style={{ width: '49%' }}>
                    <Image
                        source={{ uri: feedbackMedias[1].feedbackMediaUrl }}
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
                <ImageView
                            images={convert(feedbackMedias)}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                        />
            </TouchableOpacity>
        );
    };

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
                    <Text className='text-primary'>{Helper.formatDDMMYYYY(feedbackDate)}</Text>
                </View>
            </View>
            <View className='my-2'>
                <Text className='text-[#7F7F81] text-base'>
                    {feedbackContent}
                </Text>
            </View>
            {renderImages()}
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
