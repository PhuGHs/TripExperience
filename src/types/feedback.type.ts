import { TLocation } from './location.type';
import { TFeedbackMedia } from './media.type';
import { TUser } from './user.type';

export type TFeedback = {
    feedbackId: number;
    feedbackDate: string;
    feedbackContent: string;
    feedbackRate: number;
    tripType: string;
    userId: number;
    user: TUser;
    locationId: number;
    location: TLocation;
    feedbackMedias: TFeedbackMedia[];
};
