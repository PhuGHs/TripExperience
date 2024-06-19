import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import { TabsScreenProps } from '@type/navigator.type';

const SearchScreen = ({ navigation }: TabsScreenProps) => {
    const [isLocationSearch, setLocationSearch] = useState<boolean>(false);

    const handleTextChange = (text) => {
        console.log(text);
    };

    const handleSwitchChange = () => {
        setLocationSearch(prev => !prev);
    };

    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <View className='h-[7%] justify-between flex-row items-center'>
                <Text className='text-primary text-3xl font-bold'>Tìm kiếm</Text>
                <View className='flex flex-row items-center'>
                    <Text className='text-base text-primary'>Địa điểm</Text>
                    <Switch
                        value={!isLocationSearch}
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
        </SafeAreaView>
    );
};

export default SearchScreen;
