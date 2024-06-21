import React from "react";
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IGroup {
    press: () => void;
}

const Group = ({ press }: IGroup) => {
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
                <View className='absolute bottom-0 p-4 w-full space-y-2'>
                    <Text className=' font-bold text-white text-xl'>
                        TP Hồ Chí Minh
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 230,
        paddingVertical: 8,
        marginRight: 10
    },
    imageBackground: {
        height: 220,
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

export default Group;
