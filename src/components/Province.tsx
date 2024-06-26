import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TCity } from '@type/city.type';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IDestination {
    press: () => void;
    province: TCity
}

const Province = ({ press, province }: IDestination) => {
    const { cityUrl, cityName, feedbackQuantity } = province;
    return (
        <TouchableOpacity onPress={press} style={styles.container}>
            <ImageBackground
                source={{ uri: cityUrl}}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.7)']}
                    style={styles.gradient}
                />
                <View className='absolute bottom-0 p-4 w-full space-y-2'>
                    <Text className=' font-bold text-white text-2xl'>{cityName}</Text>
                    <Text className='text-white'>{feedbackQuantity} đánh giá</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
        paddingVertical: 8,
        marginRight: 8,
    },
    imageBackground: {
        height: 300,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        borderRadius: 10,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
});

export default Province;
