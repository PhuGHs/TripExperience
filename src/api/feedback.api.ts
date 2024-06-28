import http from '@helper/axiosConfig';
import { TFeedback, TPostFeedback } from '@type/feedback.type';
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

    static async filterFeedbacks(rating: number, timeFeedbackType: number, tripType: number): Promise<TSuccessResponse<TFeedback[]>> {
        const response = await http.get('/Feedback/filter', {
            params: {
                rating: rating,
                timeFeedbackType: timeFeedbackType,
                tripType: tripType
            }
        });
        return response.data;
    }
}
