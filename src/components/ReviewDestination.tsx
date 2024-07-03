import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TPost } from '@type/post.type';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

interface IReviewDestination {
    press: () => void;
    post: TPost;
}

const ReviewDestination = ({ press, post }: IReviewDestination) => {
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

    return (
        <TouchableOpacity
            className='bg-white w-[95%] p-3 rounded-2xl space-y-2 mr-5 ml-1 my-3'
            style={{ elevation: 2 }}
            onPress={press}
        >
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
        </TouchableOpacity>
    );
};

export default ReviewDestination;
