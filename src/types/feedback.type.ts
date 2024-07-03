import { TLocation } from './location.type';
import { TFeedbackMedia } from './media.type';
import { TUser } from './user.type';

export type TFeedback = {
    feedbackId: number;
    feedbackDate: string;
    feedbackContent: string;
    feedbackRate: number;
    tripType: number;
    userId: number;
    user: TUser;
    locationId: number;
    location: TLocation;
    feedbackMedias: TFeedbackMedia[];
};

export type TPostFeedback = {
    feedbackDate: Date,
    feedbackContent: string,
    feedbackRate: number,
    tripType: number,
    userId: string,
    locationId: number
}

export type TBlockFeedback = {
    feedbackId?: number,
    userId: string,
    locationId: number,
    score: number,
    comment: string,
    medias: string,
    tripType: number
}
