import { RouteProp } from '@react-navigation/native';
import { MapViewScreenProps, RootStackParamList } from '@type/navigator.type';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapViewScreen = ({
    route,
    navigation,
}: MapViewScreenProps & { route: RouteProp<RootStackParamList, 'MapViewScreen'> }) => {
    const { locations } = route.params;
    return (
        <SafeAreaView className='flex flex-1'>
            <MapView
                                style={styles.map}
                                region={{
                                    latitude: 14.0583,
                                    longitude: 108.2772,
                                    latitudeDelta: 2,
                                    longitudeDelta: 2,
                                }}
                            >
                                {locations.map((item, index) => <Marker
                                    title={item.location.locationName}
                                    coordinate={{
                                        latitude: item.location.locationLatitude,
                                        longitude: item.location.locationLongtitude,
                                    }}
                                />)}
                                
                            </MapView>
        </SafeAreaView>
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

export default MapViewScreen;