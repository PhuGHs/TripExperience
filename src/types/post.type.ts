import { TComment } from './comment.type';
import { TLocation } from './location.type';
import { TPostMedia } from './media.type';
import { TUser } from './user.type';

export type TPost = {
    postId: number;
    postDate: string;
    postTotalLike: number;
    postContent: string;
    userId: string;
    user: TUser;
    locationId: number;
    location: TLocation;
    postMedias: TPostMedia[];
    comments: TComment[];
};

export type TContentPost = {
    postContent: string;
    userId: string;
    locationId: number;
}