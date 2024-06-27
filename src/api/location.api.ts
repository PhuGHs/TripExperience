import http from '@helper/axiosConfig';
import { TFeedback } from '@type/feedback.type';
import { TLocation } from '@type/location.type';
import { TSuccessResponse } from '@type/response.type';

export class LocationApi {
    static async getTop10(): Promise<TSuccessResponse<TLocation[]>> {
        const response = await http.get('/Location/top-10-location');
        return response.data;
    }

    static async getDetails(locationId: number): Promise<TSuccessResponse<TLocation>> {
        const response = await http.get(`/Location/${locationId}`);
        return response.data;
    }

    static async getFeedbacks(locationId: number): Promise<TSuccessResponse<TFeedback[]>> {
        const response = await http.get(`/Location/${locationId}/feedbacks`);
        return response.data;
    }
}
