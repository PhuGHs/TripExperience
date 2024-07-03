import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DestinationDetailsScreenProps } from '@type/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@type/navigator.type';
import {
    FlatList,
    Image,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faClockFour, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import MapView, { Marker } from 'react-native-maps';
import { TLocation } from '@type/location.type';
import { LocationApi } from '@api/location.api';
import ImageView from 'react-native-image-viewing';
import { TLocationMedia } from '@type/media.type';

export type ImageViewType = {
    uri: string
};

const convert = (images: TLocationMedia[]): ImageViewType[] => {
    const arr: ImageViewType[] = [];
    images.forEach((item, index) => {
        arr.push({uri: item.locationMediaUrl});
    });
    return arr;
};

const DestinationDetails = ({
    route,
    navigation,
}: DestinationDetailsScreenProps & {
    route: RouteProp<RootStackParamList, 'DestinationDetails'>;
}) => {
    const { destinationId } = route.params;
    const [location, setLocation] = useState<TLocation | null>(null);
    const [executed, setExecuted] = useState<boolean>(false);
    const [dess, setDess] = useState<string[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await LocationApi.getDetails(destinationId);
                setLocation(data);
                setExecuted(true);
                if (data && data.locationDescription) {
                    setDess(data.locationDescription.split('//'));
                }
            } catch (error) {
                console.log(error);
                setExecuted(true);
            }
        };
        fetch();
    }, [destinationId]);

    if (location === null) {
        return (
            <View style={styles.overlay}>
                <ActivityIndicator size='large' color='#FF6F61' />
            </View>
        );
    }

    const { locationName, locationId, locationLatitude, locationLongtitude, ratingStatistic, locationMedias, locationAddress, locationRateAverage, city } = location;

    return (
        <>
            <SafeAreaView className='flex-1 mx-4 space-y-3 mt-4'>
                <View className='items-start'>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView className='space-y-3'>
                    <View className='w-full'>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Image
                                source={{uri: locationMedias[0].locationMediaUrl}}
                                style={{ height: 350 }}
                                className='w-full rounded-2xl'
                            />
                            <Text className='absolute bottom-3 right-3 text-white px-4 font-bold py-2 bg-black rounded-xl'>{locationMedias.length} ảnh</Text>
                        </TouchableOpacity>
                        <ImageView
                            images={convert(locationMedias)}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                        />
                    </View>
                    <View className='space-y-4'>
                        <Text className='text-2xl text-primary font-bold'>{locationName}</Text>
                        <View className='flex flex-row items-center space-x-2 mb-4'>
                            <FontAwesomeIcon icon={faLocationDot} size={25} color='#7F7F81' />
                            <Text className='text-secondary text-lg font-bold'>
                                {city.cityName}
                            </Text>
                        </View>
                        <View className='flex flex-row justify-between'>
                            <View className='flex flex-row space-x-3'>
                                <TouchableOpacity className='bg-slate-100 p-4 items-center justify-center w-[60px] h-[60px] rounded-xl'>
                                    <FontAwesomeIcon icon={faClockFour} size={25} color='#FF6F61' />
                                </TouchableOpacity>
                                <View className='flex flex-col justify-around'>
                                    <Text className='text-lg font-bold text-primary'>
                                        00:00 - 23:59
                                    </Text>
                                    <Text className='text-lg text-secondary'>Giờ mở cửa</Text>
                                </View>
                            </View>
                            <View className='flex flex-row space-x-3'>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.push('ReviewScreen', { destinationId: locationId, ratingStatistic: ratingStatistic, ratingAverage: locationRateAverage, locationName: locationName })
                                    }
                                    className='bg-slate-100 p-4 items-center justify-center w-[60px] h-[60px] rounded-xl'
                                >
                                    <FontAwesomeIcon icon={faStar} size={25} color='#FF6F61' />
                                </TouchableOpacity>
                                <View className='flex flex-col justify-around'>
                                    <Text className='text-lg font-bold text-primary'>{locationRateAverage}</Text>
                                    <Text className='text-lg text-secondary'>Đánh giá</Text>
                                </View>
                            </View>
                        </View>

                        <View className='flex flex-col space-y-4'>
                            <Text className='text-primary font-bold text-xl'>Đóng góp</Text>
                            <View className='flex flex-row justify-between'>
                                <TouchableOpacity
                                    onPress={() => navigation.push('ReviewDestinationScreen', { location: location })}
                                    className='w-[48%] items-center justify-center rounded-full border-[#1e1e1e] border-2 py-4'
                                >
                                    <Text className='text-primary text-base font-bold'>
                                        Viết đánh giá
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='w-[48%] items-center justify-center rounded-full border-[#1e1e1e] border-2 py-4'>
                                    <Text className='text-primary text-base font-bold'>
                                        Xem đánh giá
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='flex flex-col space-y-2'>
                            <Text className='text-xl font-bold text-primary'>Mô tả về địa điểm</Text>
                            <View className='flex flex-col space-y-2'>
                                {dess.map((item, index) => {
                                    return <Text key={index} className='text-lg text-secondary'>
                                        {item}
                                    </Text>;
                                })}
                            </View>
                        </View>
                        <View className='flex flex-col space-y-4'>
                            <Text className='text-primary font-bold text-xl'>Địa chỉ</Text>
                            <Text className='text-secondary text-lg'>
                                {locationAddress}
                            </Text>
                        </View>
                        <View className='items-center justify-center w-full h-[200px] rounded-xl'>
                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: locationLatitude,
                                    longitude: locationLongtitude,
                                    latitudeDelta: 0.0043,
                                    longitudeDelta: 0.0034,
                                }}
                            >
                                <Marker
                                    title={locationName}
                                    coordinate={{
                                        latitude: locationLatitude,
                                        longitude: locationLongtitude,
                                    }}
                                />
                            </MapView>
                        </View>
                        <Text className='text-primary text-xl font-bold'>Bạn có thể thích</Text>
                        {/* <FlatList
                            horizontal={true}
                            data={arr}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <Destination

                                    press={() =>
                                        navigation.push('DestinationDetails', { destinationId: item })
                                    }
                                />
                            )}
                        /> */}
                    </View>
                </ScrollView>
            </SafeAreaView>
            {!executed && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#FF6F61' />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default DestinationDetails;
