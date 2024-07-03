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
    messageCreateAt: string
    user?: TUser;
    chatRoom?: TChatRoom,
    messageMedias?: TMessageMedia[];
};

export type TPostMessage = {
    content: string,
    messageType: 'text' | 'image' | 'file',
    roomId: number,
    userId: string,
    messageUrls?: string[]
}

export type TPostChatRoom = {
    roomName: string,
    userIdsJoin?: string[];
    userIdsLeave?: string[]
}