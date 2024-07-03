import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TPost } from '@type/post.type';
import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

export interface IPost {
    post: TPost
}

const Post = ({ post }: IPost) => {
    return (
        <TouchableOpacity
            className='bg-white w-[350px] p-3 rounded-2xl space-y-2 mr-4'
            style={{ elevation: 2 }}
        >
            <View className='flex flex-row space-x-2'>
                <View>
                    <Image
                        source={{ uri: post.user.avatar }}
                        style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                    />
                </View>
                <View className='items-start justify-around'>
                    <Text className='font-bold text-slate-700 text-lg'>{post.user.userName}</Text>
                    <View className='flex flex-row space-x-2 items-center'>
                        <FontAwesomeIcon icon={faUsers} color='#FF6F61' size={20} />
                        <Text className='text-main'>{post.location.locationName}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text className='text-slate-700 text-base'>
                    {post.postContent}
                </Text>
            </View>
            {post.postMedias.length > 0 && <View>
                <Image
                    source={{ uri: post.postMedias[0].postMediaUrl }}
                    style={{ width: 300, height: 300 }}
                    className='rounded-xl'
                />
            </View>}
        </TouchableOpacity>
    );
};

export default Post;
