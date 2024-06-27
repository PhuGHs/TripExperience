import http from '@helper/axiosConfig';
import { TImage, TPushImage } from '@type/image.type';
import { TSuccessResponse } from '@type/response.type';

export class ImageApi {
    static async pushImages(body: TPushImage[]): Promise<TSuccessResponse<TImage[]>> {
        const response = await http.post('/User/photos', body);
        return response.data;
    }
}
