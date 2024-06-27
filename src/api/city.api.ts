import http from '@helper/axiosConfig';
import { TCity } from '@type/city.type';
import { TErrorResponse, TSuccessResponse } from '@type/response.type';

export class CityApi {
    static async getProvinces(userId: string): Promise<TSuccessResponse<TCity[]>> {
        const response = await http.get(`/City/${userId}/city-has-feedback`);
        return response.data;
    }
}
