import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { SearchDestinationRatingScreenScreenProps } from '@type/navigator.type';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PersonalRating from '@component/PersonalRating';

const arr: number[] = [1,2,3];

const SearchDestinationRatingScreen = ({ navigation }: SearchDestinationRatingScreenScreenProps) => {
    const handleTextChange = (text) => {
        console.log(text);
    };

    return (
        <SafeAreaView className='flex flex-1 mx-4 space-y-4'>
            <View className='items-start'>
                <TouchableOpacity 
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={30} />
                </TouchableOpacity>
            </View>
            <Text className='text-primary font-bold text-3xl'>Bạn muốn đánh giá địa điểm nào?</Text>
            <SearchBar
                    style={{ height: 55, width: '100%' }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-gray-200 rounded-full font-nunitoSemi'
                    placeholderTextColor='#6b7280'
                    placeholder='Tìm kiếm'
                    spinnerVisibility={false}
                    returnKeyType='search'
                    onChangeText={handleTextChange}
                />
            <FlatList
                data={arr}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <PersonalRating press={() => navigation.push('ReviewDestinationScreen')}/>}
            />
        </SafeAreaView>
    );
};

export default SearchDestinationRatingScreen;