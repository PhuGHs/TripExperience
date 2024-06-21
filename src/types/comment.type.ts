import { TPost } from './post.type';
import { TUser } from './user.type';

export type TComment = {
    commentId: number;
    commentDate: string;
    commentTotalLike: number;
    commentContent: string;
    userId: string;
    user: TUser;
    postId: number;
    post: TPost;
};
