import { TUser } from './user.type';

export type TChatRoom = {
    roomId: number,
    roomName: string,
    users: TUser[];
};

export type TMessage = {
    messageId: number,
    content: string,
    messageType: string,
    roomId: number,
    userId: number
    user?: TUser;
};