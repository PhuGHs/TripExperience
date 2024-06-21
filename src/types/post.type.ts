import { TLocation } from './location.type';
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
};
