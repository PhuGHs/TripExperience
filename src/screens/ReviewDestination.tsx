import PersonalRating from '@component/PersonalRating';
import { faAngleDown, faCloudUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const ReviewDestination = ({
    route,
    navigation,
}: ReviewScreenScreenProps & { route: RouteProp<RootStackParamList, 'ReviewDestinationScreen'> }) => {
    const [star, setStar] = useState<number>(0);
    return (
        <SafeAreaView className='flex bg-gray-200 flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                </TouchableOpacity>
            </View>
            <ScrollView className='w-full' contentContainerStyle={{alignItems: 'center'}}>
                <View className='w-[90%] bg-white rounded-xl p-3 space-y-3'>
                    <PersonalRating press={() => {}}/>
                    <Text className='text-primary text-lg font-bold'>Bạn đánh giá trải nghiệm du lịch của mình bao nhiêu ngôi sao?</Text>
                    <StarRating rating={star} color='#FAA300' onChange={(rating) => setStar(rating)} />
                    <Text className='text-primary text-lg font-bold'>Bạn đã ghé thăm lúc nào?</Text>
                    <TouchableOpacity className=''>
                        <View className='items-start justify-center'>
                            <View className='px-4 py-2 flex flex-row space-x-2 items-center rounded-full border-2 border-gray-400'>
                                <Text className='text-primary text-base'>Th5 2024</Text>
                                <FontAwesomeIcon icon={faAngleDown} color='#1e1e1e' size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text className='text-primary font-bold text-lg'>Đăng tải hình ảnh</Text>
                    <TouchableOpacity className='w-full'>
                                        <View
                                            className='w-full bg-white rounded-xl px-4 py-8 flex items-center justify-center'
                                            style={{
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                borderStyle: 'dashed',
                                                borderColor: 'grey',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCloudUpload}
                                                size={50}
                                                color='#7F7F81'
                                            />
                                            <Text className='text-lg font-nunitoSemi text-[#7F7F81]'>
                                                Chạm đây để đăng tải hình ảnh!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                    <Text className='text-primary font-bold text-lg'>Cảm nghĩ của bạn</Text>
                    <View className='w-full flex-col border-[2px] border-[#C7C7C7] rounded-lg p-2'>
                        <TextInput
                            className='w-full mb-8 font-nunitoMedium text-[17px] text-gray-700'
                            multiline={true}
                            placeholder='Chia sẻ cảm nghĩ của bạn.'
                        />
                        <Text className='text-[#F3641A] text-right font-nunitoMedium'>
                            Tối thiểu 100 ký tự
                        </Text>
                    </View>
                    <TouchableOpacity className='bg-main rounded-xl py-4'>
                        <Text className='text-center font-bold text-white text-lg'>Thêm đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
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
