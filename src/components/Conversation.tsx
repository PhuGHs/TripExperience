import { TChatRoom } from '@type/chat.type';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

interface IConversation {
    press: () => void;
    conversation: TChatRoom
}

const Conversation = ({ press, conversation }: IConversation) => {
    return (
        <TouchableOpacity
            onPress={press}
            className='flex flex-row space-x-6 rounded-full justify-between'
        >
            <View className='w-[15%]'>
                <Image
                    source={require('@asset/images/benthanh.jpg')}
                    style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                />
            </View>
            <View className='flex flex-col justify-evenly w-[80%]'>
                <Text className='text-primary font-medium text-lg'>{conversation.roomName}</Text>
                <View className='flex flex-row w-full'>
                    <Text numberOfLines={1} className='text-primary w-[70%] max-w-[70%]'>
                        this is a message
                    </Text>
                    <Text className='w-[30%] max-w-[30%]'>12/2/2024</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Conversation;
