import http from '@helper/axiosConfig';
import { TChatRoom, TMessage, TPostChatRoom, TPostMessage } from '@type/chat.type';
import { TSuccessResponse } from '@type/response.type';

export class ChatApi {
    static async getConversations(userId: string) : Promise<TSuccessResponse<TChatRoom[]>> {
        const response = await http.get('/Chat/get-conversations', {
            params: {
                userId: userId
            }
        });
        return response.data;
    }

    static async getMessages(roomId: number): Promise<TSuccessResponse<TMessage[]>> {
        const response = await http.get('/Chat/get-messages', {
            params: {
                roomId: roomId
            }
        });
        return response.data;
    };

    static async findConversations(key: string): Promise<TSuccessResponse<TChatRoom[]>> {
        const response = await http.get('/Chat/find-conversations', {
            params: {
                search: key
            }
        });
        return response.data;
    }

    static async sendMessages(body: TPostMessage): Promise<TSuccessResponse<TMessage>> {
        const response = await http.post('/Chat/send-message', body);
        return response.data;
    }

    static async createRoom(body: TPostChatRoom): Promise<TSuccessResponse<TChatRoom>> {
        const response = await http.post('/Chat/new-room', body);
        return response.data;
    }
}