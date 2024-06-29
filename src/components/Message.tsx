import { Helper } from '@helper/index';
import { TMessage } from '@type/chat.type';
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { PaperClipIcon } from 'react-native-heroicons/outline';

interface IMessage {
    is_mine: boolean;
    item: TMessage
}

const Message = ({ is_mine, item }: IMessage) => {
    const [visible, setVisible] = useState<boolean>(false);
    const handleClickLink = () => {
        if (item.messageType === 'file') {
            Linking.canOpenURL(item.files[0].url).then(supported => {
                if (supported) {
                    Linking.openURL(item.files[0].url);
                }
            });
        }
    };

    if (item.content === '') {
        return;
    }
    return (
        <View className={`w-full ${is_mine ? 'items-end' : 'items-start'} my-1`}>
            <View className={`max-w-[70%] space-x-4 ${is_mine ? 'flex-row-reverse' : 'flex-row'}`}>
                <View className='mt-5'>
                    <Image
                        source={{ uri: item.user.avatar }}
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
                        {item.user.userName}
                    </Text>
                    {item.messageType === 'text' && <TouchableOpacity
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
                            {item.content}
                        </Text>
                    </TouchableOpacity>}
                    {item.messageType === 'file' &&
                        <TouchableOpacity
                            onPress={handleClickLink}
                            className='bg-slate-300 py-3 px-4 rounded-xl'>
                            <View className='flex flex-row space-x-3 items-center'>
                                <PaperClipIcon color='black' size={25}/>
                                <Text className='text-primary'>File</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {visible && (
                        <Text className={`${is_mine ? 'text-right' : 'text-left'}`}>{Helper.formatDate1(item.messageCreateAt)}</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export default Message;
