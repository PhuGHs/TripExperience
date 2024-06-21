import React, { useState } from 'react';
import { View, Text, Switch, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import { TabsScreenProps } from '@type/navigator.type';
import Group from '@component/Group';
import FamousDestination from '@component/FamousDestination';

const arr: Number[] = [1, 2, 3, 4, 5]

const SearchScreen = ({ navigation }: TabsScreenProps) => {
    const [isLocationSearch, setLocationSearch] = useState<boolean>(false);
    const [isLocation, setLocation] = useState<boolean>(false);

    const handleTextChange = (text) => {
        console.log(text);
    };

    const handleSwitchChange = () => {
        setLocationSearch(prev => !prev);
    };

    return (
        <SafeAreaView className='flex flex-1 mx-4 mt-4'>
            <ScrollView className='h-full'
                showsVerticalScrollIndicator={false}
            >
                <View className='h-[7%] justify-between flex-row items-center'>
                    <Text className='text-primary text-3xl font-bold'>Tìm kiếm</Text>
                    <View className='flex flex-row items-center'>
                        <Text className='text-base text-primary'>Địa điểm</Text>
                        <Switch
                            value={!isLocationSearch}
                            thumbColor='#FF6F61'
                            onValueChange={handleSwitchChange}
                        />
                        <Text className='text-base text-primary'>Bài viết</Text>
                    </View>
                </View>
                <SearchBar
                    style={{ height: 55, width: '100%' }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-gray-200 rounded-full my-4'
                    placeholderTextColor='#6b7280'
                    placeholder={isLocationSearch ? 'Bạn muốn đi đâu?' : 'Bạn muốn tìm bài viết nào?'}
                    spinnerVisibility={false}
                    returnKeyType='search'
                    onFocus={() => navigation.push('SearchConversation')}
                    onChangeText={handleTextChange}
                />
                <View className='mb-4'>
                    <Text className='font-bold text-primary text-xl mb-2'>Danh sách các tỉnh</Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={arr}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <Group press={() => { navigation.navigate('GroupDetailScreen', { groupId: 1 }) }} />}
                    />
                </View>
                <View className='mb-4'>
                    <Text className='font-bold text-primary text-xl'>Địa điểm du lịch lân cận</Text>
                    {
                        isLocation
                            ? <FlatList
                                style={{ marginTop: 8 }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={arr}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <FamousDestination press={() => navigation.push('DestinationDetails', { destinationId: 1 })} />}
                            />
                            : <View className='px-5 py-5 bg-[#096C47] rounded-lg mt-5'>
                                <Text className='text-center font-bold text-white text-2xl mb-2'>Xem địa điểm du lịch lân cận</Text>
                                <View className='items-center mb-2'>
                                    <TouchableOpacity className='border-2 border-white w-[150px] px-2 py-[7px] mt-2 rounded-2xl justify-center items-center'
                                        onPress={() => setLocation(true)}
                                    >
                                        <Text className='text-white text-base'>Bật cài đặt vị trí</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchScreen;
