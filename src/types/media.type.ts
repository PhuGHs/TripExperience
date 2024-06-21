import { TComment } from './comment.type';
import { TFeedback } from './feedback.type';
import { TPost } from './post.type';

export type TCommentMedia = {
    commentMediaId: number;
    commentMediaOrder: number;
    commentMediaUrl: string;
    commentId: number;
    comment: TComment;
};

export type TPostMedia = {
    postMediaId: number;
    postMediaOrder: number;
    postMediaUrl: string;
    postId: number;
    post: TPost;
};

export type TFeedbackMedia = {
    feedbackMediaId: number;
    feedbackMediaOrder: string;
    feedbackMediaUrl: string;
    feedbackId: number;
    feedback: TFeedback;
};
