import http from "@helper/axiosConfig";
import { TComment, TCommentPost } from "@type/comment.type";
import { TImage, TPushImage } from "@type/image.type";
import { TCommentMedia, TCommentMediatoPost } from "@type/media.type";
import { TSuccessResponse } from "@type/response.type";
import { TUser } from "@type/user.type";

export class CommentApi {
    static async addContent(body: TCommentPost): Promise<TSuccessResponse<TComment>> {
        const response = await http.post('/Comment', body);
        return response.data;
    }

    static async addPhoto(body: TPushImage): Promise<TSuccessResponse<TImage>> {
        const response = await http.post('/User/photo', body);
        return response.data;
    }

    static async postPhoto(body: TCommentMediatoPost): Promise<TSuccessResponse<TCommentMedia>> {
        const response = await http.post('/Media/comment-medias', body);
        return response.data;
    }

    static async getCommentOfPost(postId: number): Promise<TSuccessResponse<TComment[]>> {
        const response = await http.get(`/Comment/posts/${postId}/comments`);
        return response.data;
    }
}