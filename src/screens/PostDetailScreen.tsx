import React, { useCallback, useContext, useEffect, useState } from "react";
import { PostDetailScreenProps, RootStackParamList } from "@type/navigator.type";
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { PaperAirplaneIcon, XMarkIcon } from "react-native-heroicons/outline";
import { CameraIcon } from "react-native-heroicons/solid";
import Comment from "@component/Comment";
import { TPost } from "@type/post.type";
import { PostApi } from "@api/post.api";
import { Asset, ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";
import { TComment, TCommentPost } from "@type/comment.type";
import { useInput } from "@hook/useInput";
import { UserContext } from "@context/user-context";
import { TPushImage } from "@type/image.type";
import { CommentApi } from "@api/comment.api";
import { ToastOptions, toast } from "@baronha/ting";

const arr: Number[] = [1, 2, 3, 4, 5]

const PostDetailScreen = ({
    route,
    navigation,
}: PostDetailScreenProps & { route: RouteProp<RootStackParamList, 'PostDetailScreen'> }) => {
    const { postId } = route.params;
    const { user } = useContext(UserContext);

    const [post, setPost] = useState<TPost>(null);
    const [comment, setComment] = useState<TComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState<Asset>(null);
    const [isImage, setIsImage] = useState<boolean>(false);

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
        validationFn: (value) => true,
    });

    useFocusEffect(
        useCallback(() => {
            const fetchAPI = async () => {
                try {
                    const { data } = await PostApi.getPostDetail(postId);
                    setPost(data);
                    const { data: comments } = await CommentApi.getCommentOfPost(postId);
                    setComment(comments);
                    setLoading(false);
                }
                catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }

            fetchAPI();
            return () => {
                //Clean up function
            };
        }, [])
    )

    const handleRemoveImage = () => {
        setImage(null);
        setIsImage(false);
    };

    const pickImages = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: true,
            presentationStyle: 'fullScreen',
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        if (!result.errorCode) {
            if (result.assets) {
                setImage(result.assets[0]);
            }
        }
        setIsImage(true);
    };

    const formatDate = (date) => {
        const inputDate = new Date(date);

        const year = inputDate.getUTCFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDate.getDate().toString().padStart(2, "0");

        const time =
            inputDate.getHours().toString().padStart(2, "0") +
            ":" +
            inputDate.getMinutes().toString().padStart(2, "0");

        const formattedDate = `${day}/${month}/${year}  ${time}  `;
        return formattedDate;
    }

    const HandleAddComment = async () => {
        const body: TCommentPost = {
            commentContent: content,
            userId: user.id,
            postId: postId,
        };
        const imageComment: TPushImage = {
            fileName: image.fileName,
            base64: image.base64,
        }
        try {
            const { data: comment } = await CommentApi.addContent(body);
            const { data, message } = await CommentApi.addPhoto(imageComment);

            console.log("checkAPI: ", data);

            const { data: result } = await CommentApi.postPhoto({
                commentMediaOrder: 1,
                commentMediaUrl: data.photoUrl,
                commentId: comment.commentId,
            })
            const options: ToastOptions = {
                title: 'Đánh giá thành công',
                message: 'Đã gửi bình luận',
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

    const renderHeader = () => (
        <>
            <View className="flex flex-row items-center mt-2 mb-5">
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='p-2 rounded-xl border border-slate-300'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
                <Text className="flex-1 text-center mr-[20px] text-primary text-xl font-bold">Chi tiết bài viết</Text>
            </View>
            <View className='space-y-2 mb-5'>
                <View className='flex flex-row space-x-2'>
                    <View>
                        <Image
                            source={{ uri: `${post.user.avatar}` }}
                            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                        />
                    </View>
                    <View className='items-start justify-around'>
                        <Text className='font-bold text-slate-700 text-lg'>{post.user.userName}</Text>
                        <Text className='text-base italic'>{formatDate(post.postDate)}</Text>
                    </View>
                </View>
                <View>
                    <Text className='text-slate-700 text-base mb-1'>{post.postContent}</Text>
                    <Text className='text-primary font-bold text-base'>tại {post.location.locationName}</Text>
                </View>
                <View>
                    <Image
                        source={{ uri: `${post.postMedias[0].postMediaUrl}` }}
                        style={{ width: '100%', height: 300 }}
                        className='rounded-xl'
                    />
                </View>
            </View>
            <View className="flex space-y-2">
                <Text className='text-primary font-bold text-xl'>Bình luận</Text>
                <View className="flex border-[2px] border-[#E3E1D9] rounded-xl px-2 pb-2 justify-around mb-5">
                    <TextInput placeholder="Viết một điều gì đó ..."
                        className="text-primary w-[90%] h-[90px] text-base pt-[5px]"
                        textAlignVertical="top"
                        multiline
                        value={content}
                        onChange={handleContentChange}
                        onBlur={handleContentBlur}
                    />
                    {
                        isImage && <View className="w-[130px]">
                            <View className=''>
                                <Image source={{ uri: `${image.uri}` }}
                                    style={{ width: 120, height: 120, borderRadius: 10 }} />
                            </View>
                            <TouchableOpacity
                                onPress={() => handleRemoveImage()}
                                className='rounded-full p-1 absolute top-[-10] right-0 bg-black'>
                                <XMarkIcon size={16} color='white' />
                            </TouchableOpacity>
                        </View>
                    }
                    <View className="flex-row justify-between mt-3">
                        <CameraIcon size={20} color="#071952" onPress={pickImages} />
                        <PaperAirplaneIcon size={20} color="#FF6F61" onPress={() => HandleAddComment()} />
                    </View>


                </View>
            </View>
        </>
    )
    return (
        <SafeAreaView className="flex flex-1 h-full w-full">
            {
                loading ? <ActivityIndicator size="small" color="#FF6F61" />
                    : <FlatList
                        style={{ paddingHorizontal: 16 }}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={renderHeader}
                        data={comment}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <Comment comment={item} />}
                    />
            }

        </SafeAreaView>
    )
}

export default PostDetailScreen;