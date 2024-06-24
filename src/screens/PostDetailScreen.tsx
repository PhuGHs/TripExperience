import React from 'react';
import { PostDetailScreenProps, RootStackParamList } from '@type/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { PaperAirplaneIcon } from 'react-native-heroicons/outline';
import Comment from '@component/Comment';

const arr: Number[] = [1, 2, 3, 4, 5];

const PostDetailScreen = ({
    route,
    navigation,
}: PostDetailScreenProps & { route: RouteProp<RootStackParamList, 'PostDetailScreen'> }) => {
    const renderHeader = () => (
        <>
            <View className='flex flex-row items-center mt-2 mb-5'>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'
                >
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
                <Text className='flex-1 text-center mr-[20px] text-primary text-xl font-bold'>
                    Chi tiết bài viết
                </Text>
            </View>
            <View className='space-y-2 mb-5'>
                <View className='flex flex-row space-x-2'>
                    <View>
                        <Image
                            source={require('@asset/images/benthanh.jpg')}
                            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                        />
                    </View>
                    <View className='items-start justify-around'>
                        <Text className='font-bold text-slate-700 text-lg'>Le Van Phu</Text>
                        <Text className='text-base italic'>22/06/2024</Text>
                    </View>
                </View>
                <View>
                    <Text className='text-slate-700 text-base mb-1'>
                        This iconic market is renowned for its wide array of goods, from traditional
                        Vietnamese handicrafts and souvenirs to fresh produce and delicious street
                        food.
                    </Text>
                    <Text className='text-primary font-bold text-base'>tại Chợ Bến Thành</Text>
                </View>
                <View>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{ width: '100%', height: 300 }}
                        className='rounded-xl'
                    />
                </View>
            </View>
            <View className='flex space-y-2'>
                <Text className='text-primary font-bold text-xl'>Bình luận</Text>
                <View className='flex-row border-[2px] border-[#E3E1D9] rounded-xl px-1 justify-around mb-5'>
                    <TextInput
                        placeholder='Viết một điều gì đó ...'
                        className='text-primary w-[90%] h-[90px] text-base pt-[5px]'
                        textAlignVertical='top'
                    />
                    <PaperAirplaneIcon size={20} color='#FF6F61' style={{ marginTop: 5 }} />
                </View>
            </View>
        </>
    );
    return (
        <SafeAreaView className='flex flex-1 h-full w-full'>
            <FlatList
                style={{ paddingHorizontal: 16 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
                data={arr}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Comment />}
            />
        </SafeAreaView>
    );
};

export default PostDetailScreen;
