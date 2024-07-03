import http from '@helper/axiosConfig';
import { TLocation } from '@type/location.type';
import { TSuccessResponse } from '@type/response.type';
import { TFeedback } from '@type/feedback.type';

export class LocationApi {
    static async getLocationByCity(cityId: number): Promise<TSuccessResponse<TLocation[]>> {
        const response = await http.get(`/Location/get-locations-by-city?cityId=${cityId}`);
        return response.data;
    }

    static async getLocationById(locationId: number): Promise<TSuccessResponse<TLocation>> {
        const response = await http.get(`/Location/${locationId}`);
        return response.data;
    }

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