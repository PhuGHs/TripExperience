import http from "@helper/axiosConfig";
import { TLocation } from "@type/location.type"
import { TSuccessResponse } from "@type/response.type";

export class LocationApi {
    static async getLocationByCity(cityId: number): Promise<TSuccessResponse<TLocation[]>> {
        const response = await http.get(`/Location/get-locations-by-city?cityId=${cityId}`);
        return response.data;
    }
}