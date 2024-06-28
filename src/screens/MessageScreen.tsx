import Message from '@component/Message';
import SingleSidedShadowBox from '@component/SingleSidedShadowBox';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { MessageScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, Keyboard, TextInput } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentPickerOptions, DocumentPickerResponse, pick, pickDirectory, types } from 'react-native-document-picker';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { TMessage, TPostMessage } from '@type/chat.type';
import { UserContext } from '@context/user-context';
import { ChatApi } from '@api/chat.api';

const arr: boolean[] = [false, false, true, false, true, true, true, true, true];

const MessageScreen = ({
    route,
    navigation,
}: MessageScreenScreenProps & { route: RouteProp<RootStackParamList, 'MessageScreen'> }) => {
    const { roomName, conversationId } = route.params;
    const { user } = useContext(UserContext);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(true);
    const [messages, setMessages] = useState<TMessage[]>([]);

    const handlePickFiles = async () => {
        try {
            const options: DocumentPickerOptions = {
                allowMultiSelection: true,
                type: [types.pdf, types.docx, types.doc]
            };
            const result: DocumentPickerResponse[] = await pick(options);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendMessage = async () => {
        const body: TPostMessage = {
            content: messageValue,
            messageType: 'text',
            roomId: conversationId,
            userId: user.id,
        };
        try {
            const { data, message } = await ChatApi.sendMessages(body);
            setMessages(prev => [...prev, data]);
        } catch (error) {
            console.log(error);
        }
    };

    const pickImages = async () => {
        try {
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                selectionLimit: 3,
                includeBase64: true,
                presentationStyle: 'fullScreen',
                quality: 0.6
            };
            const result: ImagePickerResponse = await launchImageLibrary(options);
            if (!result.errorCode) { 
                if (result.assets) {
                    console.log('sdadsa');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message } = await ChatApi.getMessages(conversationId);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [conversationId]);
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            setOpen(false);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            setOpen(true);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const {
        value: messageValue,
        handleInputBlur: handleMessageBlur,
        handleInputChange: handleMessageChange,
        setEnteredValue: setMessageValue,
        hasError: messageHasError,
    } = useInput({ defaultValue: '', validationFn: (message) => message != '' });

    return (
        <SafeAreaView className='flex flex-1'>
            <SingleSidedShadowBox style={{ overflow: 'hidden' }}>
                <View className='flex flex-row items-center border-gray-400 border-b-[1px] pb-3 px-4 pt-4'>
                    <View className='w-[15%] items-start'>
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            className='p-2 rounded-xl border border-slate-300'
                        >
                            <FontAwesomeIcon icon={faAngleLeft} size={30} />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-primary text-start font-bold text-[22px] w-[69%] ml-2'>
                        {roomName}
                    </Text>
                    <TouchableOpacity className='w-[15%] items-end'>
                        <Image
                            source={require('@asset/images/benthanh.jpg')}
                            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                        />
                    </TouchableOpacity>
                </View>
            </SingleSidedShadowBox>
            <FlatList
                className='mx-4'
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Message item={item} is_mine={item.userId === user.id} key={index} />}
            />
            <View className='min-h-[9%] max-h-[20%] py-2 flex flex-row w-full items-center'>
                {open ? (
                    <View className='flex flex-row max-w-[30%] w-[25%] items-center'>
                        <TouchableOpacity
                            onPress={handlePickFiles}
                            className='w-[50%] items-center'>
                            <PaperClipIcon size={30} color='#334155' />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={pickImages}
                            className='w-[50%] items-center'>
                            <PhotoIcon size={30} color='#1D84C6' />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        className='w-[10%] items-center'
                    >
                        <ChevronRightIcon size={30} color='#1D84C6' />
                    </TouchableOpacity>
                )}
                <View
                    className={`${open ? 'w-[60%]' : 'w-[75%]'} ${
                        open && isKeyboardVisible ? 'w-[60%]' : 'w-[72%]'
                    }`}
                >
                    <TextInput
                        placeholder='Nhắn tin'
                        multiline={true}
                        value={messageValue}
                        onChange={(e) => {
                            setOpen(false);
                            handleMessageChange(e);
                        }}
                        onBlur={handleMessageBlur}
                        className='bg-gray-200 rounded-full px-3 text-base text-primary'
                    />
                </View>
                {isKeyboardVisible && (
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        className='w-[15%] items-center'>
                        <PaperAirplaneIcon size={30} color='#1D84C6' />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default MessageScreen;
