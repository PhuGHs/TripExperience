import http from "@helper/axiosConfig";
import { TLocation, TLocationGet } from "@type/location.type";
import { TPlan, TPlanAddLocation, TPlanToPost, TPlanUpdate } from "@type/plan.type";
import { TSuccessResponse } from "@type/response.type";

export class PlanApi {
    static async getTravelPlan(userId: string): Promise<TSuccessResponse<TPlan[]>> {
        const response = await http.get(`/TravelPlan/${userId}/travel-plans`);
        return response.data;
    }

    static async addTravelPlan(body: TPlanToPost): Promise<TSuccessResponse<TPlan>> {
        const response = await http.post('/TravelPlan', body);
        return response.data;
    }

    static async addLocation(body: TPlanAddLocation): Promise<TSuccessResponse<TPlan>> {
        const response = await http.post('/PlanDetail', body);
        return response.data;
    }

    static async updateTravelPlan(body: TPlanUpdate): Promise<TSuccessResponse<TPlan>> {
        const response = await http.put('/TravelPlan', body);
        return response.data;
    }

    static async getPlanDetail(travelPlanId: number): Promise<TSuccessResponse<TPlan>> {
        const response = await http.get(`/TravelPlan/${travelPlanId}`);
        return response.data;
    }

    static async getDetail(travelPlanId: number): Promise<TSuccessResponse<TLocationGet[]>> {
        const response = await http.get(`/TravelPlan/${travelPlanId}/plan-detail`);
        return response.data;
    }
}