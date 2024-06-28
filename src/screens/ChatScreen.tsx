import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ChatScreenScreenProps } from '@type/navigator.type';
import React from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import Conversation from '@component/Conversation';
import { UserPlusIcon } from 'react-native-heroicons/outline';

const arr: number[] = [1, 2, 3, 4];

const ChatScreen = ({ navigation }: ChatScreenScreenProps) => {
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
            <View className='flex flex-row items-center space-x-4 justify-between'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <Text className='text-primary font-bold text-[22px] text-center'>Tin nhắn</Text>
                <TouchableOpacity className='items-center justify-center w-[10%]'>
                    <UserPlusIcon size={24} color='#1E1E1E' />
                </TouchableOpacity>
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
            />
            <FlatList
                data={arr}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({ item, index }) => (
                    <Conversation press={() => navigation.push('MessageScreen')} />
                )}
            />
        </SafeAreaView>
    );
};

export default ChatScreen;
