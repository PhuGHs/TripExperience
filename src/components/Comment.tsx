import { TComment } from "@type/comment.type";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export type IComment = {
    comment?: TComment
}

const Comment = ({ comment }: IComment) => {
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
        <View className='flex flex-row space-x-2 mb-4'>
            <View>
                <Image
                    source={{ uri: `${comment.user.avatar}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                />
            </View>
            <View className='items-start'>
                <Text className='font-bold text-slate-700 text-base mb-1'>{comment.user.userName}</Text>
                <Text className='text-primary'>{comment.commentContent}</Text>
                {
                    comment.commentMedias.length > 0 ? <View className="mt-3">
                        <Image
                            source={{ uri: `${comment.commentMedias[0].commentMediaUrl}` }}
                            style={{ width: 150, height: 150, borderRadius: 10 }}
                        />
                    </View>
                        : null
                }
                <Text className='text-primary italic mt-2 text-[#686D76]'>{formatDate(comment.commentDate)}</Text>
            </View>
        </View>
    )
}

export default Comment;