import http from "@helper/axiosConfig";
import { TImage, TPushImage } from "@type/image.type";
import { TPostMedia } from "@type/media.type";
import { TContentPost, TPost } from "@type/post.type";
import { TSuccessResponse } from "@type/response.type";

export class PostApi {
    static async addContent(body: TContentPost): Promise<TSuccessResponse<TPost>> {
        const response = await http.post('/Post', body);
        return response.data;
    }

    static async addPhoto(body: TPushImage[]): Promise<TSuccessResponse<TImage[]>> {
        const response = await http.post('/User/photos', body);
        return response.data;
    }

    static async addSinglePhoto(body: TPushImage): Promise<TSuccessResponse<TImage>> {
        const response = await http.post('/User/photo', body);
        return response.data;
    }

    static async postPhoto(body: TPostMedia): Promise<TSuccessResponse<TPostMedia>> {
        const response = await http.post('/Media/post-medias', body);
        return response.data;
    }

    static async getPostByCity(cityId: number): Promise<TSuccessResponse<TPost[]>> {
        const response = await http.get(`/Post/${cityId}/posts-by-city`);
        return response.data;
    }

    static async getPostDetail(postId: number): Promise<TSuccessResponse<TPost>> {
        const response = await http.get(`/Post/${postId}`);
        return response.data;
    }
}