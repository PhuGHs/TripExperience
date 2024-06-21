import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IFamousDestination {
    press: () => void;
}

const FamousDestination = ({ press }: IFamousDestination) => {
    return (
        <TouchableOpacity
            onPress={press}
            style={styles.container}>
            <ImageBackground
                source={require('@asset/images/benthanh.jpg')}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.7)']}
                    style={styles.gradient}
                />
                <View className='absolute bottom-0 p-3 w-full space-y-2'>
                    <Text className=' font-bold text-white text-xl'>
                        Chợ Bến Thành
                    </Text>
                    <View className='flex flex-row justify-between'>
                        <View>
                            <View className='flex flex-row items-center space-x-2'>
                                <Text className='font-bold text-base text-orange-400'>4.7</Text>
                                <FontAwesomeIcon icon={faStar} color='#fb923c' size={25} />
                            </View>
                        </View>
                        <TouchableOpacity className='bg-main px-3 rounded-full items-center justify-center'>
                            <Text className='text-white font-bold text-sm'>Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 220,
        paddingVertical: 8,
        marginRight: 8
    },
    imageBackground: {
        height: 250,
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

export default FamousDestination;