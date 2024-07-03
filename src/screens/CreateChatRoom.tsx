import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { CreateChatRoomScreenProps, RootStackParamList } from '@type/navigator.type';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import { TUser } from '@type/user.type';
import { UserApi } from '@api/user.api';
import User from '@component/User';
import SelectedUser from '@component/SelectedUser';
import { ToastOptions, toast } from '@baronha/ting';
import { ChatApi } from '@api/chat.api';
import { TPostChatRoom } from '@type/chat.type';
import { UserContext } from '@context/user-context';

const CreateChatRoom = ({
    route,
    navigation,
}: CreateChatRoomScreenProps & {
    route: RouteProp<RootStackParamList, 'CreateChatRoom'>;
}) => {
    const [ usersFound, setUsersFound] = useState<TUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);
    const [executed, setExecuted] = useState<boolean>(true);
    const { user } = useContext(UserContext);

    const handleSearch = async (text: string) => {
        try {
            const { data, message} = await UserApi.searchUsers(text, user.id);
            setUsersFound(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTextChange = (text) => {
        if (text === '') {
            setUsersFound([]);
        } else {
            handleSearch(text);
        }
    };

    const manageUsers = (user: TUser, type: 'add' | 'remove') => {
        if (type === 'remove') {
            setSelectedUsers(prev => prev.filter(item => item.id !== user.id));
        } else if (type === 'add') {
            setSelectedUsers(prev => {
                if (!prev.some(item => item.id === user.id)) {
                    return [...prev, user];
                } else {
                    const options: ToastOptions = {
                        title: 'Thêm người dùng',
                        message: 'Người dùng này đã được thêm',
                        preset: 'error',
                        backgroundColor: '#e2e8f0',
                    };
                    toast(options);
                }
                return prev;
            });
        }
    };

    const createRoom = async () => {
        const arr: string[] = [...selectedUsers.map((item, index) => item.id), user.id];
        const body: TPostChatRoom = {
            roomName: userName,
            userIdsJoin: arr
        };
        if (arr.length < 3) {
            const options: ToastOptions = {
                title: 'Tạo nhóm',
                message: 'Không thể tạo nhóm với chỉ 2 thành viên',
                preset: 'error',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            return;
        }
        setExecuted(false);
        try {
            const { data, message } = await ChatApi.createRoom(body);
            const options: ToastOptions = {
                title: 'Tạo nhóm',
                message: 'Tạo nhóm thành công',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            setExecuted(true);
            navigation.pop();
        } catch (error) {
            console.log(error);
            setExecuted(true);
        }
    };
    

    const {
        value: userName,
        handleInputBlur: handleUserNameBlur,
        handleInputChange: handleUserNameChange,
        setEnteredValue: setUserName,
        didEdit: userNameDidEdit,
        hasError: userNameHasError,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value !== '',
    });

    return (
        <>
            <SafeAreaView className='flex flex-1 mx-4 my-4 space-y-4'>
            <View className='flex flex-row items-center space-x-4 justify-between'>
                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        className='p-2 rounded-xl border border-slate-300'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={30} />
                    </TouchableOpacity>
                </View>
                <View className='w-[50%] items-center justify-center'>
                    <Text className='text-primary font-bold text-[22px]'>Tạo nhóm</Text>
                </View>
                <TouchableOpacity
                    disabled={userNameHasError}
                    onPress={createRoom}
                    className='bg-main px-5 py-3 rounded-xl'>
                    <Text className='font-bold text-white text-base'>Tạo</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className='space-y-4'>
            <View className='flex flex-col space-y-2'>
                <Text className='text-primary font-semibold text-lg'>Tên nhóm</Text>
                    <TextInput
                        value={userName}
                        onChange={handleUserNameChange}
                        onBlur={handleUserNameBlur}
                        className='border-2 border-gray-400 rounded-lg text-primary text-base font-regular px-4 py-3'
                        placeholder='Tên nhóm'
                        placeholderTextColor='#94a38b'
                    />
                {userNameHasError && userNameDidEdit && <Text className='text-main text-base'>Trường này bắt buộc</Text>}
            </View>
            <View>
                <Text className='text-primary text-lg font-semibold'>Chọn thành viên</Text>
                <SearchBar
                    style={{ height: 55, width: '100%' }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-gray-200 rounded-full my-4'
                    placeholderTextColor='#6b7280'
                    placeholder='Tìm kiếm tên người dùng'
                    spinnerVisibility={false}
                    returnKeyType='search'
                    onChangeText={handleTextChange}
                />
                {selectedUsers && selectedUsers.length > 0 && <View className='flex flex-wrap flex-row w-full min-h-[150px] bg-slate-100 rounded-xl p-3'>
                    {selectedUsers.map((item, index) => <SelectedUser user={item} key={index} press={() => manageUsers(item, 'remove')}/>)}
                </View>}
            </View>
            <Text className='text-primary text-lg font-semibold'>Kết quả tìm được: </Text>
            {/* <FlatList
                data={usersFound}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <User user={item} key={index} press={() => manageUsers(item, 'add')}/>}
            /> */}
            {usersFound.map((item, index) => <User user={item} key={index} press={() => manageUsers(item, 'add')}/> )}
            </ScrollView>
        </SafeAreaView>
        {!executed && (
            <View style={styles.overlay}>
                <ActivityIndicator size='large' color='#FF6F61' />
            </View>
        )}
        </>
    );
};

const styles = StyleSheet.create({
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

export default CreateChatRoom;