import React, { useContext, useRef, useState } from "react";
import { NewPostScreenProps, RootStackParamList } from "@type/navigator.type";
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { MapPinIcon, PhotoIcon } from "react-native-heroicons/solid";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import Chip from "@component/Chip";
import {
    ImageLibraryOptions,
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';
import { ToastOptions, toast } from "@baronha/ting";
import { UserContext } from "@context/user-context";
import { Asset } from "react-native-image-picker";
import { XMarkIcon } from "react-native-heroicons/outline";
import { TContentPost, TPost } from "@type/post.type";
import { useInput } from "@hook/useInput";
import { TPushImage } from "@type/image.type";
import { PostApi } from "@api/post.api";

const NewPostScreen = ({
    route,
    navigation,
}: NewPostScreenProps & { route: RouteProp<RootStackParamList, 'NewPostScreen'> }) => {
    const { locations } = route.params;
    const { user } = useContext(UserContext);

    const [locationId, setLocationId] = useState<number>(null);
    const [imageList, setImageList] = useState<Asset[]>([]);
    const [locationName, setLocationName] = useState<string>("");
    const [isImage, setIsImage] = useState<boolean>(false);
    const sheetRef = useRef<BottomSheetMethods>(null);

    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setThoughtsValue,
        hasError: thoughtsHasError,
        didEdit,
        setDidEdit,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value.trim().split(/\s+/).length > 6,
    });

    const HandleLocation = (id: number, name: string) => {
        setLocationId(id);
        setLocationName(name);
        sheetRef.current.close();
    }

    const handleRemoveImage = (fileName) => {
        setImageList((prev) => prev.filter((item, index) => item.fileName !== fileName));
    };

    const pickImages = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 3,
            includeBase64: true,
            presentationStyle: 'fullScreen',
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        if (!result.errorCode) {
            if (result.assets) {
                setImageList(result.assets);
            }
        }
        setIsImage(true);
    };

    const HandleAddPost = async () => {
        if (locationId === null) {
            const options: ToastOptions = {
                title: 'Thêm bài viết không thành công',
                message: "Vui lòng chọn địa điểm",
                preset: 'error',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
        }
        else {
            const body: TContentPost = {
                postContent: content,
                userId: user.id,
                locationId: locationId,
            };
            const images: TPushImage[] = imageList.map((item, index) => {
                return { fileName: item.fileName, base64: item.base64 };
            });
            try {
                const { data: post } = await PostApi.addContent(body);
                const { data, message } = await PostApi.addPhoto(images);
                data.forEach(async (item, index) => {
                    await PostApi.postPhoto({
                        postMediaId: index,
                        postMediaOrder: index,
                        postMediaUrl: item.photoUrl,
                        postId: post.postId,
                        post: null,
                    });
                });
                const options: ToastOptions = {
                    title: 'Đánh giá thành công',
                    message: 'Bài chia sẻ kinh nghiệm của bạn đã được đăng',
                    preset: 'done',
                    backgroundColor: '#e2e8f0',
                };
                toast(options);
                navigation.popToTop();
            } catch (error) {
                console.log(error);
                const options: ToastOptions = {
                    title: 'Đã có lỗi xảy ra',
                    message: 'Thử lại sau nhé!',
                    preset: 'error',
                    backgroundColor: '#e2e8f0',
                };
                toast(options);
            }
        }
    }

    return (
        <>
            <SafeAreaView className="flex flex-1 h-full w-full">
                <ScrollView className="h-full px-4"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex flex-row items-center mt-2 mb-5">
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            className='p-2 rounded-xl border border-slate-300'>
                            <FontAwesomeIcon icon={faAngleLeft} size={20} />
                        </TouchableOpacity>
                        <Text className="flex-1 text-center mr-[20px] text-primary text-xl font-bold">Thêm bài viết</Text>
                    </View>
                    <View className='flex flex-row space-x-2'>
                        <View>
                            <Image
                                source={{ uri: `${user.avatar}` }}
                                style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                            />
                        </View>
                        <View className='items-start justify-around'>
                            <Text className='font-bold text-slate-700 text-lg'>{user.userName}</Text>
                            <Text className='text-base italic'>{locationName !== "" ? "Tại " + locationName : "Địa điểm X"}</Text>
                        </View>
                    </View>
                    <TextInput placeholder="Bạn muốn chia sẻ điều gì"
                        className="text-xl text-primary h-[250px] mb-3"
                        textAlignVertical="top"
                        multiline
                        value={content}
                        onChange={handleContentChange}
                        onBlur={handleContentBlur}
                    />
                    {
                        isImage &&
                        <View className='w-full flex-row mb-5'>
                            {imageList.map((item, index) => {
                                return (
                                    <View key={index} className='mr-4'>
                                        <View className=''>
                                            <Image source={{ uri: item.uri }} style={{ width: 90, height: 90 }} />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => handleRemoveImage(item.fileName)}
                                            className='rounded-full p-1 absolute top-0 right-0 bg-black'>
                                            <XMarkIcon size={16} color='white' />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    }

                    <View className="mb-5">
                        <View className='border-b border-[#E3E1D9] w-full mb-4' />
                        <TouchableOpacity className="flex-row space-x-2 items-center mb-4"
                            onPress={pickImages}
                        >
                            <PhotoIcon size={24} color="#096C47" />
                            <Text className="text-primary text-base">Thêm ảnh</Text>
                        </TouchableOpacity>
                        <View className='border-b border-[#E3E1D9] w-full mb-4' />
                        <TouchableOpacity className="flex-row space-x-2 items-center mb-4"
                            onPress={() => sheetRef.current?.open()}
                        >
                            <MapPinIcon size={24} color="#FF6F61" />
                            <Text className="text-primary text-base">Thêm địa điểm</Text>
                        </TouchableOpacity>
                        <View className='border-b border-[#E3E1D9] w-full' />
                    </View>
                    <View className="flex items-center mb-5">
                        <TouchableOpacity className="w-[50%] items-center py-2 bg-main rounded"
                            onPress={() => HandleAddPost()}
                        >
                            <Text className="text-white font-bold text-base">Thêm bài viết</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomSheet ref={sheetRef} height="60%">
                <View className='h-full'>
                    <Text className='text-center text-primary font-bold text-base mb-5'>Chọn địa điểm</Text>
                    <View className='flex flex-wrap flex-row px-5 mb-5 w-full'>
                        {locations.map((item, index) => {
                            return (
                                <Chip key={index} press={() => HandleLocation(item.locationId, item.locationName)}>
                                    <View className='flex flex-row space-x-1 items-center'>
                                        <Text className='text-primary font-medium text-base'>
                                            {item.locationName}
                                        </Text>
                                    </View>
                                </Chip>
                            );
                        })}
                    </View>
                </View>
            </BottomSheet>
        </>

    )
}

export default NewPostScreen;