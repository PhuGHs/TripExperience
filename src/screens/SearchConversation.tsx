import { ChatApi } from '@api/chat.api';
import Conversation from '@component/Conversation';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TChatRoom } from '@type/chat.type';
import { SearchConversationScreenProps } from '@type/navigator.type';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';

const arr: number[] = [1, 2, 3, 4];

const SearchConversation = ({ navigation }: SearchConversationScreenProps) => {
    const [conversations, setConversations] = useState<TChatRoom[]>([]);

    
    const handleSearch = async (text: string) => {
        try {
            const {data, message} = await ChatApi.findConversations(text);
            setConversations(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTextChange = (text) => {
        handleSearch(text);
    };

    const renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#1e1e1e',
                height: 0.5,
                marginVertical: 8,
            }}
        />
    );

    return (
        <SafeAreaView className='flex flex-1 mx-4 mt-4'>
            <View className='flex flex-row items-center space-x-4'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
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
                onChangeText={handleTextChange}
            />
            <FlatList
                data={conversations}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({ item, index }) => (
                    <Conversation conversation={item} key={index} press={() => navigation.push('MessageScreen')} />
                )}
            />
        </SafeAreaView>
    );
};

export default SearchConversation;
