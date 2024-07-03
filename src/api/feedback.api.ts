import http from '@helper/axiosConfig';
import { TBlockFeedback, TFeedback, TPostFeedback } from '@type/feedback.type';
import { TSuccessResponse } from '@type/response.type';

export class FeedbackApi {
    static async getAll(): Promise<TSuccessResponse<TFeedback[]>> {
        const response = await http.get('/Feedback');
        return response.data;
    }

    static async getUserFeedbacks(userId: string): Promise<TSuccessResponse<TFeedback[]>> {
        const response = await http.get(`/Feedback/${userId}/feedbacks`);
        return response.data;
    }

    static async giveFeedback(body: TPostFeedback): Promise<TSuccessResponse<TFeedback>> {
        const response = await http.post('/Feedback/add-to-db', body);
        return response.data;
    }

    static async filterFeedbacks(rating: number, timeFeedbackType: number, tripType: number, locationId: number): Promise<TSuccessResponse<TFeedback[]>> {
        const response = await http.get(`/Feedback/filter/${locationId}`, {
            params: {
                rating: rating,
                timeFeedbackType: timeFeedbackType,
                tripType: tripType
            }
        });
        return response.data;
    }

    static async getFeedbacksByUserIdAndCityId(userId: string, cityId: number): Promise<TSuccessResponse<TFeedback[]>> {
        const response = await http.get(`/Feedback/${userId}/${cityId}/feedbacks`);
        return response.data;
    }

    static async addToBlock(body: TBlockFeedback): Promise<TSuccessResponse<TFeedback>> {
        const response = await http.post('/Feedback/add-to-block', body);
        return response.data;
    }
}
