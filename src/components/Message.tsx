import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface IMessage {
    is_mine: boolean;
}

const Message = ({ is_mine }: IMessage) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <View className={`w-full ${is_mine ? 'items-end' : 'items-start'} my-1`}>
            <View className={`max-w-[70%] space-x-4 ${is_mine ? 'flex-row-reverse' : 'flex-row'}`}>
                <View className='items-center justify-center'>
                    <Image
                        source={require('@asset/images/benthanh.jpg')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            borderWidth: 1,
                            borderColor: '#334155',
                        }}
                    />
                </View>
                <View className={`flex flex-col space-y-2 ${is_mine ? 'mr-3' : ''}`}>
                    <Text
                        className={`text-gray-700 text-primary font-medium text-base ${
                            is_mine ? 'text-right mr-1' : 'text-left ml-1'
                        }`}
                    >
                        Jackson
                    </Text>
                    <TouchableOpacity
                        className={`px-2 py-3 rounded-xl ${
                            is_mine ? 'bg-[#1D84C6]' : 'bg-neutral-300'
                        }`}
                        onPress={() => setVisible((prev) => !prev)}
                    >
                        <Text
                            className={`font-nunitoSemi text-base ${
                                is_mine ? 'text-white' : 'text-slate-700'
                            }`}
                        >
                            kkkkkkkkkkkkkkkkkkkkkkkksd ssssssssssssssssssssssssss
                        </Text>
                    </TouchableOpacity>
                    {visible && (
                        <Text className={`${is_mine ? 'text-right' : 'text-left'}`}>5:04 PM</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export default Message;
