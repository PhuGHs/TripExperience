import http from '@helper/axiosConfig';
import { TAuth, TLoginPost, TSignUp } from '@type/account.type';
import { TErrorResponse, TSuccessResponse } from '@type/response.type';

export class AuthApi {
    static async login(body: TLoginPost): Promise<TSuccessResponse<TAuth>> {
        const response = await http.post('/Auth/login', body);
        return response.data;
    }

    static async signup(body: TSignUp): Promise<TSuccessResponse<unknown>> {
        const response = await http.post('/Auth/register', body);
        return response.data;
    }
}
