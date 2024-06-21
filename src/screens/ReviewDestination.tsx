import PersonalRating from '@component/PersonalRating';
import { faAngleDown, faCloudUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReviewScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import { useRef, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Helper } from '@root/helpers';
import moment from 'moment';

const ReviewDestination = ({
    route,
    navigation,
}: ReviewScreenScreenProps & { route: RouteProp<RootStackParamList, 'ReviewDestinationScreen'> }) => {
    const [star, setStar] = useState<number>(0);
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [date, setDate] = useState<DateType>(dayjs());
    const [dateString, setDateString] = useState<string>(Helper.formatDDMMYYYY(dayjs().toString()));
    const pickImages = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 3,
            includeBase64: true,
            presentationStyle: 'fullScreen',
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        console.log(result);
    };
    return (
        <>
            <SafeAreaView className='flex bg-gray-200 flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                </TouchableOpacity>
            </View>
            <ScrollView className='w-full' contentContainerStyle={{alignItems: 'center'}}>
                <View className='w-[90%] bg-white rounded-xl p-3 space-y-3'>
                    <PersonalRating press={() => {}}/>
                    <Text className='text-primary text-lg font-medium'>Bạn đánh giá trải nghiệm du lịch của mình bao nhiêu ngôi sao?</Text>
                    <StarRating rating={star} color='#FAA300' onChange={(rating) => setStar(rating)} />
                    <Text className='text-primary text-lg font-medium'>Bạn đã ghé thăm lúc nào?</Text>
                    <TouchableOpacity 
                        onPress={() => sheetRef.current?.open()}
                        className=''>
                        <View className='items-start justify-center'>
                            <View className='px-4 py-2 flex flex-row space-x-2 items-center rounded-full border-2 border-gray-400'>
                                <Text className='text-primary text-base'>{dateString}</Text>
                                <FontAwesomeIcon icon={faAngleDown} color='#1e1e1e' size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text className='text-primary font-medium text-lg'>Đăng tải hình ảnh</Text>
                    <TouchableOpacity 
                        onPress={pickImages}
                        className='w-full'>
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
                                            <Text className='text-base font-nunitoSemi text-[#7F7F81]'>
                                                Chạm đây để đăng tải hình ảnh!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                    <Text className='text-primary font-medium text-lg'>Cảm nghĩ của bạn</Text>
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
            <BottomSheet ref={sheetRef} height='60%'>
                <View>
                    <DateTimePicker
                        selectedItemColor='#FF6F61'
                        mode="single"
                        date={date}
                        locale={dayjs.locale('vn')}
                        onChange={(params) => {
                            setDate(params.date);
                            console.log(params.date);
                            setDateString(Helper.formatDDMMYYYY(params.date.toString()));
                        }}
                    />
                </View>
            </BottomSheet>
        </>
    );
};

export default ReviewDestination;
