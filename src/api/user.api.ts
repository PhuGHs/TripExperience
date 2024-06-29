import http from '@helper/axiosConfig';
import { TAuth, TLoginPost } from '@type/account.type';
import { TErrorResponse, TSuccessResponse } from '@type/response.type';
import { TPutUser, TUser } from '@type/user.type';

export class UserApi {
    static async changeInfo(body: TPutUser): Promise<TSuccessResponse<TUser>> {
        const response = await http.put('/User', body);
        return response.data;
    }

    static async searchUsers(key: string, userId: string): Promise<TSuccessResponse<TUser[]>> {
        const response = await http.get('/User/search', {
            params: {
                userNameSearchString: key,
                userIdNotInList: userId
            }
        });
        return response.data;
    }
}
