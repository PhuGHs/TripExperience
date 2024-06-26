import { Rating } from '@component/RatingProgress';
import { TRatingStatistic } from '@type/location.type';
import { TRatingFilter, TStarFilter } from '@type/rating.type';

export const stars: TStarFilter[] = [
    {
        id: 1,
        star: 1,
        selected: false,
    },
    {
        id: 2,
        star: 2,
        selected: false,
    },
    {
        id: 3,
        star: 3,
        selected: false,
    },
    {
        id: 4,
        star: 4,
        selected: false,
    },
    {
        id: 5,
        star: 5,
        selected: false,
    },
];

export const dates: TRatingFilter[] = [
    {
        id: 1,
        name: 'Tất cả đánh giá',
        selected: false,
    },
    {
        id: 2,
        name: '3 tháng trước',
        selected: false,
    },
    {
        id: 3,
        name: '6 tháng trước',
        selected: false,
    },
    {
        id: 4,
        name: '12 tháng qua',
        selected: false,
    },
];

export const kinds: TRatingFilter[] = [
    {
        id: 1,
        name: 'Công tác',
        selected: false,
    },
    {
        id: 2,
        name: 'Cặp đôi',
        selected: false,
    },
    {
        id: 3,
        name: 'Gia đình',
        selected: false,
    },
    {
        id: 4,
        name: 'Bạn bè',
        selected: false,
    },
    {
        id: 5,
        name: 'Đi một mình',
        selected: false,
    },
];

export const formatRating = (ratingStatistic: TRatingStatistic) => {
    const totalFeedback: number = getTotalFeedback(ratingStatistic);
    const arr: Rating[] = [
        {
            index: 0,
            type: 'Xuất xắc',
            percentage: totalFeedback === 0 ? 0 : ratingStatistic[5] / totalFeedback,
            number: ratingStatistic[5]
        },
        {
            index: 1,
            type: 'Rất tốt',
            percentage: totalFeedback === 0 ? 0 : ratingStatistic[4] / totalFeedback,
            number: ratingStatistic[4]
        },
        {
            index: 2,
            type: 'Trung bình',
            percentage: totalFeedback === 0 ? 0 : ratingStatistic[3] / totalFeedback,
            number: ratingStatistic[3]
        },
        {
            index: 3,
            type: 'Tồi',
            percentage: totalFeedback === 0 ? 0 : ratingStatistic[2] / totalFeedback,
            number: ratingStatistic[2]
        },
        {
            index: 4,
            type: 'Tồi tệ',
            percentage: totalFeedback === 0 ? 0 : ratingStatistic[1] / totalFeedback,
            number: ratingStatistic[1]
        },
    ];
    return arr;
};

export const getTotalFeedback = (ratingStatistic: TRatingStatistic) => {
    let total = 0;
    total = ratingStatistic[1] + ratingStatistic[2] + ratingStatistic[3] + ratingStatistic[4] + ratingStatistic[5];
    return total;
};
