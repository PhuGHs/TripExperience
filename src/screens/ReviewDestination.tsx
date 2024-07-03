import PersonalRating from '@component/PersonalRating';
import { faCloudUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewDestinationScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, ScrollView, Image, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import {
    Asset,
    ImageLibraryOptions,
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import { FeedbackApi } from '@api/feedback.api';
import { TBlockFeedback, TPostFeedback } from '@type/feedback.type';
import { UserContext } from '@context/user-context';
import { useInput } from '@hook/useInput';
import Chip from '@component/Chip';
import { kinds } from '../static/rating.static';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { ImageApi } from '@api/image.api';
import { TPushImage } from '@type/image.type';
import { MediaApi } from '@api/media.api';
import { ToastOptions, toast } from '@baronha/ting';

const ReviewDestination = ({
    route,
    navigation,
}: ReviewDestinationScreenScreenProps & {
    route: RouteProp<RootStackParamList, 'ReviewDestinationScreen'>;
}) => {
    const { location } = route.params;
    const { user } = useContext(UserContext);
    const scrollViewRef = React.createRef<ScrollView>();

    const [star, setStar] = useState<number>(0);
    const [selectedKinds, setSelectedKinds] = useState(kinds);
    const [listImages, setListImages] = useState<Asset[]>([]);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [executed, setExecuted] = useState<boolean>(true);

    const handleSelectKinds = (id: number) => {
        setSelectedKinds((prev) => prev.map((item, index) => {
            if (item.id === id) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            return item;
        }));
    };

    const handleRemoveImage = (fileName) => {
        setListImages((prev) => prev.filter((item, index) => item.fileName !== fileName));
    };

    const pickImages = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 3,
            includeBase64: true,
            presentationStyle: 'fullScreen',
            quality: 0.6
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        if (!result.errorCode) { 
            if (result.assets) {
                setListImages(result.assets);
            }
        }
    };

    const {
        value: thoughts,
        handleInputChange: handleThoughtsChange,
        handleInputBlur: handleThoughtsBlur,
        setEnteredValue: setThoughtsValue,
        hasError: thoughtsHasError,
        didEdit,
        setDidEdit,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value.trim().split(/\s+/).length > 6,
    });

    const wordCount = thoughts.trim().split(/\s+/).length;
    const remainingWords = 100 - wordCount;

    const handleGiveFeedback = async () => {
        setExecuted(false);
        const selectedKind = selectedKinds.find((item, index) => item.selected);
        const body: TPostFeedback = {
            locationId: location.locationId,
            userId: user.id,
            feedbackRate: star,
            feedbackDate: new Date(),
            tripType: selectedKind.id,
            feedbackContent: thoughts
        };
        const images: TPushImage[] = listImages.map((item, index) => {
            return { fileName: item.fileName, base64: item.base64 };
        });
        try {
            const { data: feedback } = await FeedbackApi.giveFeedback(body);
            const { data, message } = await ImageApi.pushImages(images);
            data.forEach(async (item, index) => {
                await MediaApi.postFeedbackMedias({
                    feedbackId: feedback.feedbackId,
                    feedbackMediaOrder: index,
                    feedbackMediaUrl: item.photoUrl
                });
            });
            const body1: TBlockFeedback = {
                feedbackId: feedback.feedbackId,
                userId: user.id,
                locationId: location.locationId,
                score: star,
                comment: thoughts,
                tripType: selectedKind.id,
                medias: 'http://res.cloudinary.com/dx6aim1qs/image/upload/v1719632234/thanh-co-quang-tri-3.jpg'
            };
            await FeedbackApi.addToBlock(body1);
            const options: ToastOptions = {
                title: 'Đánh giá thành công',
                message: 'Tiếp tục đánh giá giúp phát triển ứng dụng bạn nhé',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            navigation.popToTop();
            setExecuted(true);
        } catch (error) {
            console.log(error);
            const options: ToastOptions = {
                title: 'Đã có lỗi xảy ra',
                message: 'Thử lại sau nhé!',
                preset: 'error',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            setExecuted(true);
        }
    };


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            if (isKeyboardVisible && scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({animated: true});
            }
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    
    return (
        <>
            <SafeAreaView className='flex bg-gray-200 flex-1 space-y-3'>
                <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={scrollViewRef}
                    className='w-full' contentContainerStyle={{ alignItems: 'center' }}>
                    <View className='w-[90%] bg-white rounded-xl p-3 space-y-3'>
                        <PersonalRating location={location}  press={() => {}} />
                        <Text className='text-primary text-lg font-medium'>
                            Bạn đánh giá trải nghiệm du lịch của mình bao nhiêu ngôi sao?
                        </Text>
                        <StarRating
                            rating={star}
                            color='#FAA300'
                            onChange={(rating) => setStar(rating)}
                        />
                        <Text className='text-primary text-lg font-medium'>
                            Bạn đi với ai?
                        </Text>
                        <View className='flex flex-wrap flex-row w-full'>
                                    {selectedKinds.map((item, index) => {
                                        return (
                                            <Chip
                                                isSelected={item.selected}
                                                key={index}
                                                press={() => handleSelectKinds(item.id)}>
                                                <View className='flex flex-row space-x-1 items-center'>
                                                    <Text className='text-primary font-medium text-base'>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </Chip>
                                        );
                                    })}
                                </View>
                        <Text className='text-primary font-medium text-lg'>Đăng tải hình ảnh</Text>
                        {listImages.length === 0 ? <TouchableOpacity onPress={pickImages} className='w-full'>
                            <View
                                className='w-full bg-white rounded-xl px-4 py-8 flex items-center justify-center'
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderStyle: 'dashed',
                                    borderColor: 'grey',
                                }}
                            >
                                <FontAwesomeIcon icon={faCloudUpload} size={50} color='#7F7F81' />
                                <Text className='text-base font-nunitoSemi text-[#7F7F81]'>
                                    Chạm đây để đăng tải hình ảnh!
                                </Text>
                            </View>
                        </TouchableOpacity> : (
                            <View className='w-full flex-row'>
                                {listImages.map((item, index) => {
                                    return (
                                        <View key={index} className='mr-4'>
                                            <View className=''>
                                                <Image source={{uri: item.uri}} style={{width: 90, height: 90}}/>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => handleRemoveImage(item.fileName)}
                                                className='rounded-full p-1 absolute top-0 right-0 bg-black'>
                                                <XMarkIcon size={16} color='white' />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                        <Text className='text-primary font-medium text-lg'>Cảm nghĩ của bạn</Text>
                        <View className='w-full flex-col border-[2px] border-[#C7C7C7] rounded-lg p-2'>
                            <TextInput
                                value={thoughts}
                                onChange={handleThoughtsChange}
                                onBlur={handleThoughtsBlur}
                                className='w-full mb-8 font-nunitoMedium text-[17px] text-gray-700'
                                multiline={true}
                                placeholder='Chia sẻ cảm nghĩ của bạn.'
                            />
                            <Text className='text-[#F3641A] text-right font-nunitoMedium'>
                                còn lại {remainingWords} từ
                            </Text>
                        </View>
                        {thoughtsHasError && didEdit && <Text className='text-[#F3641A]'>Bạn cần viết tối thiểu 6 từ</Text>}
                        <TouchableOpacity
                            onPress={handleGiveFeedback}
                            disabled={thoughtsHasError || star === 0 || selectedKinds.find((item, index) => item.selected) === undefined}
                            className='bg-main rounded-xl py-4'>
                            <Text className='text-center font-bold text-white text-lg'>
                                Thêm đánh giá
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {!executed && (
            <View style={styles.overlay}>
                <ActivityIndicator size='large' color='#FF6F61' />
            </View>
        )}
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default ReviewDestination;
