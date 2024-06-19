import Conversation from '@component/Conversation';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SearchConversationScreenProps } from '@type/navigator.type';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';

const arr: number[] = [1,2,3,4];

const SearchConversation = ({ navigation }: SearchConversationScreenProps) => {
    const handleTextChange = (text) => {
        console.log(text);
    };

    const renderSeparator = () => (
        <View
          style={{
            backgroundColor: '#1e1e1e',
            height: 0.5,
            marginVertical: 8
          }}
        />
    );

    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <View className='flex flex-row items-center space-x-4'>
                <View className=''>
                    <TouchableOpacity 
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'>
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px]'>Tìm kiếm</Text>
            </View>
            <SearchBar
                    style={{ height: 55, width: '100%' }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-gray-200 rounded-full my-4'
                    placeholderTextColor='#6b7280'
                    placeholder='Tìm kiếm cuộc trò chuyện'
                    spinnerVisibility={false}
                    returnKeyType='search'
                    onFocus={() => navigation.push('SearchConversation')}
                    onChangeText={handleTextChange}
                />
            <FlatList
                data={arr}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({item, index}) => <Conversation press={() => navigation.push('MessageScreen')}/>}
            />
        </SafeAreaView>
    );
};

export default SearchConversation;