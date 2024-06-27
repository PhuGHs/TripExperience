import http from '@helper/axiosConfig';
import { TFeedbackMedia } from '@type/media.type';
import { TSuccessResponse } from '@type/response.type';

export class MediaApi {
    static async postFeedbackMedias(body: TFeedbackMedia): Promise<TSuccessResponse<TFeedbackMedia>> {
        const response = await http.post('/Media/feedback-medias', body);
        return response.data;
    }
}
