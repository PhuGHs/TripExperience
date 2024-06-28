import { TMessageMedia } from './media.type';
import { TUser } from './user.type';

export type TChatRoom = {
    roomId: number,
    roomName: string,
    users: TUser[];
};

export type TMessage = {
    messageId: number,
    content: string,
    messageType: 'text' | 'image' | 'file',
    roomId: number,
    userId: string
    user?: TUser;
    chatRoom?: TChatRoom,
    files?: TMessageMedia[]
};

export type TPostMessage = {
    content: string,
    messageType: 'text' | 'image' | 'file',
    roomId: number,
    userId: string,
    files?: TMessageMedia[]
}

export type TPostChatRoom = {
    roomName: string,
    userIds: string[];
}