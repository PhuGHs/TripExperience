import Destination from '@component/Destination';
import Post from '@component/Post';
import { TabsScreenProps } from '@type/navigator.type';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Platform, PermissionsAndroid, FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { TLocation } from '@type/location.type';
import { LocationApi } from '@api/location.api';
import { UserContext } from '@context/user-context';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    const [province, setProvince] = useState<string>(null);
    const [locations, setLocations] = useState<TLocation[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await LocationApi.getTop10();
                setLocations(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission denied');
                    return;
                }
            }
            getCurrentLocation();
        };

        requestLocationPermission();
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getProvinceFromCoords(latitude, longitude);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getProvinceFromCoords = async (latitude, longitude) => {
        const apiKey = 'AIzaSyA9wtTmO2rJDpLfM8FRmHN-LrUdOKqOb_Y';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const addressComponents = response.data.results[0].address_components;
            const provinceComponent = addressComponents.find((component) =>
                component.types.includes('administrative_area_level_1')
            );
            if (provinceComponent) {
                setProvince(provinceComponent.long_name);
            } else {
                console.log('Province not found');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className='flex flex-1 h-full w-full'>
            <ScrollView className='h-full'>
                <View className='h-[120px] px-6 items-center bg-main flex-row justify-between'>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-white text-base font-semibold'>Xin chào {user.userName}, </Text>
                        <Text className='font-bold text-white text-3xl'>Khám phá</Text>
                    </View>
                    <View>
                        <View className='items-center'>
                            <View className='rounded-full border-[2px] border-white'>
                                <Image
                                    source={{uri: user.avatar}}
                                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View className='m-3'>
                    <Text className='font-bold text-primary text-xl mb-2'>
                        Các địa điểm ưa thích
                    </Text>
                    <FlatList
                        horizontal={true}
                        data={locations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => <Destination location={item} press={() => navigation.push('DestinationDetails', {destinationId: item.locationId})}/>}
                    />
                </View>
                <View className='m-3'>
                    <Text className='font-bold text-primary text-xl mb-2'>
                        Các bài chia sẻ kinh nghiệm
                    </Text>
                    <Post />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
