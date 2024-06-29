import { CityApi } from "@api/city.api";
import CitySearch from "@component/CitySearch";
import PersonalRating from "@component/PersonalRating";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TCity } from "@type/city.type";
import { TLocation, TSearch } from "@type/location.type";
import { SearchCityScreenScreenProps } from "@type/navigator.type";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const arr: number[] = [1, 2, 3];

const SearchCityScreen = ({
    navigation,
}: SearchCityScreenScreenProps) => {
    const [results, setResults] = useState<TSearch<TLocation | TCity>[]>([]);
    const [searchParam, setSearchParam] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const handleTextChange = async (searchParam) => {
        setLoading(true);
        const { data } = await CityApi.search(searchParam);
        setResults(data);
        setLoading(false);
        console.log(searchParam);
    };

    return (
        <SafeAreaView className='flex flex-1 mx-4 space-y-4 mt-4'>
            <View className='items-start'>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'
                >
                    <FontAwesomeIcon icon={faAngleLeft} size={30} />
                </TouchableOpacity>
            </View>
            <Text className='text-primary font-bold text-3xl'>Bạn muốn đi đâu?</Text>
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
            {
                loading ? <ActivityIndicator size="small" color="#FF6F61" />
                    : <FlatList
                        showsVerticalScrollIndicator={false}
                        data={results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (item.isLocation) {
                                return <PersonalRating location={item.result as TLocation} press={() => navigation.push('ReviewDestinationScreen', { location: item.result as TLocation })} />;
                            }
                            return;
                        }}
                    />
            }

        </SafeAreaView>
    )
}

export default SearchCityScreen;