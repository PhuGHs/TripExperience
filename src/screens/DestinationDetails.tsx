import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DestinationDetailsScreenProps } from '@type/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@type/navigator.type';
import { FlatList, Image, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faClockFour, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import Destination from '@component/Destination';

const arr: number[] = [1, 2, 3, 4, 5, 6, 7];

const DestinationDetails = ({
    route,
    navigation,
}: DestinationDetailsScreenProps & { route: RouteProp<RootStackParamList, 'DestinationDetails'> }) => {
    return (
        <SafeAreaView className='flex-1 mx-4 space-y-3'>
            <View className='items-start'>
                <TouchableOpacity 
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={30} />
                </TouchableOpacity>
            </View>
            <ScrollView className='space-y-3'>
                <View className='w-full'>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{height: 350}}
                        className='w-full rounded-2xl'
                    />
                    <View className='absolute bottom-2 left-2'>
                        <FlatList
                            horizontal={true}
                            data={arr}
                            contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity key={index} className='items-center justify-center mr-3'>
                                            <View className='w-[73px] h-[73px] border-2 border-[#FF6F61] rounded-2xl items-center justify-center'>
                                                <Image
                                                    source={require('@asset/images/benthanh.jpg')}
                                                    className='w-[70px] h-[70px] rounded-2xl'
                                                />
                                            </View>
                                        </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>
                <View className='space-y-4'>
                    <Text className='text-2xl text-primary font-bold'>Chợ Bến Thành</Text>
                    <View className='flex flex-row items-center space-x-2 mb-4'>
                        <FontAwesomeIcon icon={faLocationDot} size={25} color='#7F7F81' />
                        <Text className='text-secondary text-lg font-bold'>Thành phố Hồ Chí Minh</Text>
                    </View>
                    <View className='flex flex-row justify-between'>
                        <View className='flex flex-row space-x-3'>
                            <TouchableOpacity className='bg-slate-100 p-4 items-center justify-center w-[60px] h-[60px] rounded-xl'>
                                <FontAwesomeIcon icon={faClockFour} size={25} color='#FF6F61'/>
                            </TouchableOpacity>
                            <View className='flex flex-col justify-around'>
                                <Text className='text-lg font-bold text-primary'>6.8KM</Text>
                                <Text className='text-lg text-secondary'>Khoảng cách</Text>
                            </View>
                        </View>
                        <View className='flex flex-row space-x-3'>
                            <TouchableOpacity 
                                onPress={() => navigation.push('ReviewScreen', { destinationId: 3})}
                                className='bg-slate-100 p-4 items-center justify-center w-[60px] h-[60px] rounded-xl'>
                                <FontAwesomeIcon icon={faStar} size={25} color='#FF6F61'/>
                            </TouchableOpacity>
                            <View className='flex flex-col justify-around'>
                                <Text className='text-lg font-bold text-primary'>4.5</Text>
                                <Text className='text-lg text-secondary'>Đánh giá</Text>
                            </View>
                        </View>
                    </View>
                    <View className='flex flex-col space-y-4'>
                        <Text className='text-primary font-bold text-xl'>Đóng góp</Text>
                        <View className='flex flex-row justify-between'>
                    <TouchableOpacity 
                        onPress={() => navigation.push('SearchDestinationRatingScreen')}
                        className='w-[48%] items-center justify-center rounded-full border-[#1e1e1e] border-2 py-4'>
                        <Text className='text-primary text-base font-bold'>Viết đánh giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[48%] items-center justify-center rounded-full border-[#1e1e1e] border-2 py-4'>
                        <Text className='text-primary text-base font-bold'>Xem đánh giá</Text>
                    </TouchableOpacity>
                </View>
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-xl font-bold text-primary'>Mô tả về địa điểm</Text>
                        <Text className='text-lg text-secondary'>Bến Thành Market is one of the most famous landmarks in Ho Chi Minh City, Vietnam. It's located in District 1, at the intersection of Lê Lợi, Hùng Vương, Lê Thánh Tôn, and Phan Chu Trinh streets. The market is not just a commercial hub but also a historical symbol of the city's vibrant culture and economy.</Text>
                    </View>
                    <Text className='text-primary text-xl font-bold'>Bạn có thể thích</Text>
                    <FlatList
                        horizontal={true}
                        data={arr}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => <Destination press={() => navigation.push('DestinationDetails', { destinationId: item })}/>}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DestinationDetails;
