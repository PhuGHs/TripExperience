import Message from '@component/Message';
import SingleSidedShadowBox from '@component/SingleSidedShadowBox';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { MessageScreenScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, Keyboard, TextInput, Platform, AppState, NativeEventSubscription } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentPickerOptions, DocumentPickerResponse, pick, pickDirectory, types } from 'react-native-document-picker';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { TMessage, TPostMessage } from '@type/chat.type';
import { UserContext } from '@context/user-context';
import { ChatApi } from '@api/chat.api';
import RNFetchBlob from 'rn-fetch-blob';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ImageApi } from '@api/image.api';
import { NotificationID, NotificationType } from '@type/notification.type';
import { AndroidImportance, AndroidLaunchActivityFlag, AndroidVisibility } from '@notifee/react-native';
import notifee from '@notifee/react-native';

const MessageScreen = ({
    route,
    navigation,
}: MessageScreenScreenProps & { route: RouteProp<RootStackParamList, 'MessageScreen'> }) => {
    const { roomName, conversationId } = route.params;
    const { user } = useContext(UserContext);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(true);
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [connection, setConnection] = useState(null);
    const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = useCallback(
    (newState: any) => {
      console.log(`AppState changed to ${newState}`);
      setAppState(newState);
    },
    []
  );

  const handlePushNotification = useCallback(
    async (
      enabled: boolean,
      notificationID: string,
      notificationType: NotificationType,
      message: string
    ) => {
      if (!enabled) {
        return;
      }
      const channelId = await notifee.createChannel({
        id: notificationID,
        name: 'TripX',
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
      });

      if (notificationType === NotificationType.Eating) {
        await notifee.displayNotification({
          title: roomName,
          body: message,
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'androidOpenApp',
              launchActivity: 'default',
              launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },
            actions: [
              {
                title: 'Stop Eating', 
                pressAction: {
                  id: 'stop-eating',
                },
              },
            ],
          },
        });
      } else if (notificationType === NotificationType.Sleeping) {
        await notifee.displayNotification({
          title: roomName,
          body: message,
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'androidOpenApp',
              launchActivity: 'default',
              launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },

            actions: [
              {
                title: 'Stop Sleeping',
                pressAction: {
                  id: 'stop-sleeping',
                },
              },
            ],
          },
        });
      } 
    }, []
  );

  useEffect(() => {
    let isActive = true;
    let appStateSubscriber: NativeEventSubscription;
    const loadNavSubscriber = async () => {
      if (isActive) {
        // Adding the listener for whether the user leaves the app
        appStateSubscriber = AppState.addEventListener('change', 
        handleAppStateChange);
      }
    };
    loadNavSubscriber();
    
    // It's always good practice to ask the user for notification permissions
    const getNotificationPermissions = async () => {
      if (isActive) {
        const settings = await notifee.requestPermission();
      }
    };
    getNotificationPermissions();
    return () => {
      isActive = false;
      if (appStateSubscriber) appStateSubscriber.remove();
    };
  }, []);

    const handlePickFiles = async () => {
        try {
            const options: DocumentPickerOptions = {
                allowMultiSelection: false,
                type: [types.pdf, types.docx, types.doc]
            };
            const result: DocumentPickerResponse[] = await pick(options);
            const filebase = await RNFetchBlob.fs.readFile(result[0].uri, 'base64');
            const { data, message } = await ImageApi.pushImage({ fileName: result[0].name, base64: filebase });
            console.log(data.photoUrl);
            const body: TPostMessage = {
                content: 'Sent a file',
                messageType: 'file',
                roomId: conversationId,
                userId: user.id,
                messageUrls: [
                    data.photoUrl
                ]
            };
            const { data: ms } = await ChatApi.sendMessages(body);
            setMessages(prev => [...prev, ms]);
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
            setMessageValue('');
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
        const connect = new HubConnectionBuilder()
            .withUrl('https://b60b-171-250-164-150.ngrok-free.app/chathub')
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }, []);

    

    useEffect(() => {
        if (connection) {
            connection
              .start()
              .then(() => {
                console.log('SignalR connected');
                connection.on('ReceiveMessage', (result) => {
                    if (result.user.id !== user.id && result.roomId === conversationId) {
                        setMessages(prev => [...prev, result]);
                        handlePushNotification(
                          true, 
                          NotificationID.DefaultID,
                            NotificationType.Sleeping,
                            result.content
                          );
                    }
                });
              })
              .catch((error) => {
                console.error('Error starting SignalR connection:', error);
              });
          }
        const fetch = async () => {
            try {
                const { data, message } = await ChatApi.getMessages(conversationId);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [conversationId, connection]);
    
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
                data={messages.slice().reverse()}
                keyExtractor={(item, index) => index.toString()}
                inverted={true}
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
