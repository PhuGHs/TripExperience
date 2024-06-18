import Destination from '@component/Destination';
import Post from '@component/Post';
import { faGlobeAsia, faLocationDot, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TabsScreenProps } from '@type/navigator.type';
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <View className='flex flex-1 h-full w-full'>
            <ScrollView className='h-full'>
                <View className='h-[200px] px-6 pt-6 pb-2 bg-main flex-row justify-between'>
                    <View className='flex flex-col justify-around'>
                        <Text className='font-bold text-white text-4xl'>Khám phá</Text>
                        <View className='flex flex-row items-center space-x-2'>
                            <Text className='text-white font-bold text-lg'>Thành phố Hồ Chí Minh</Text>
                            <FontAwesomeIcon icon={faLocationDot} size={25} color='white'/>
                        </View>
                        <View className='flex flex-row items-center space-x-2'>
                            <Text className='text-white font-bold text-lg'>Việt Nam</Text>
                            <FontAwesomeIcon icon={faGlobeAsia} size={25} color='white'/>
                        </View>
                    </View>
                    <View>
                        <View className='items-center'>
                            <View className='rounded-full border-[2px] border-white'>
                                <Image
                                    source={require('@asset/images/login.png')}
                                    style={{width: 70, height: 70, borderRadius: 70/2}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View className='m-3'>
                    <Text className='font-bold text-primary text-2xl mb-2'>Các địa điểm ưa thích</Text>
                    <Destination press={() => navigation.push('DestinationDetails', { destinationId: 1 })}/>
                </View>
                <View className='m-3'>
                    <Text className='font-bold text-primary text-2xl mb-2'>Các bài chia sẻ kinh nghiệm</Text>
                    <Post />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
