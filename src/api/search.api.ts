import http from '@helper/axiosConfig';
import { TCity } from '@type/city.type';
import { TFeedback } from '@type/feedback.type';
import { TLocation, TSearch } from '@type/location.type';
import { TSuccessResponse } from '@type/response.type';

export class SearchApi {
    static async search(keyword: string): Promise<TSuccessResponse<TSearch<TLocation | TCity>[]>> {
        const response = await http.get('/Location/search-locations-or-cities', {
            params: {
                searchString: keyword
            }
        });
        return response.data;
    }
}
