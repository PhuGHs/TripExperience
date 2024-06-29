import { TCommentMedia } from './media.type';
import { TPost } from './post.type';
import { TUser } from './user.type';

export type TComment = {
    commentId: number;
    commentMedias: TCommentMedia[];
    commentDate: string;
    commentTotalLike: number;
    commentContent: string;
    userId: string;
    user: TUser;
    postId: number;
    post: TPost;
};

export type TCommentPost = {
    commentContent: string;
    userId: string;
    postId: number;
}
