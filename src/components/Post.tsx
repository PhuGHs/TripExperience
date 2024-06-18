import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

const Post = () => {
    return (
        <TouchableOpacity className='bg-white w-[92%] p-3 rounded-2xl space-y-2' style={{elevation: 2}}>
            <View className='flex flex-row space-x-2'>
                <View>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{width: 60, height: 60, borderRadius: 60/2}}
                    />
                </View>
                <View className='items-start justify-around'>
                    <Text className='font-bold text-slate-700 text-lg'>Le Van Phu</Text>
                    <View className='flex flex-row space-x-2 items-center'>
                        <FontAwesomeIcon icon={faUsers} color='#FF6F61' size={20} />
                        <Text className='text-main'>Tp. HCM</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text className='text-slate-700 text-base'>This iconic market is renowned for its wide array of goods, from traditional Vietnamese handicrafts and souvenirs to fresh produce and delicious street food.</Text>
            </View>
            <View>
                <Image
                    source={require('@asset/images/benthanh.jpg')}
                    style={{width: '100%', height: 300}}
                    className='rounded-xl'
                />
            </View>
        </TouchableOpacity>
    );
};

export default Post;