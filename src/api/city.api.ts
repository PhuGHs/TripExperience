import http from "@helper/axiosConfig";
import { TCity } from "@type/city.type";
import { TLocation, TSearch } from "@type/location.type";
import { TSuccessResponse } from "@type/response.type";

export class CityApi {
    static async getAll(): Promise<TSuccessResponse<TCity[]>> {
        const response = await http.get('/City/');
        return response.data;
    }

    static async getDetail(cityId: number): Promise<TSuccessResponse<TCity>> {
        const response = await http.get(`/City/${cityId}`);
        return response.data;
    }

    static async search(keyword: string): Promise<TSuccessResponse<TSearch<TLocation | TCity>[]>> {
        const response = await http.get('/Location/search-locations-or-cities', {
            params: {
                searchString: keyword
            }
        });
        return response.data;
    }
}