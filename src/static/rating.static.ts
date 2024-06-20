import { Rating } from '@component/RatingProgress';
import { TRatingFilter, TStarFilter } from '@type/rating.type';

export const ratings: Rating[] = [
    {
        index: 0,
        type: 'Xuất xắc',
        percentage: 70
    },
    {
        index: 1,
        type: 'Rất tốt',
        percentage: 20
    },
    {
        index: 2,
        type: 'Trung bình',
        percentage: 10
    },
    {
        index: 3,
        type: 'Tồi',
        percentage: 8
    },
    {
        index: 4,
        type: 'Tồi tệ',
        percentage: 2
    },
];

export const stars: TStarFilter[] = [
    {
        id: 1,
        star: 1,
        selected: false
    },
    {
        id: 2,
        star: 2,
        selected: false
    },
    {
        id: 3,
        star: 3,
        selected: false
    },
    {
        id: 4,
        star: 4,
        selected: false
    },
    {
        id: 5,
        star: 5,
        selected: false
    },
];

export const dates: TRatingFilter[] = [
    {
        id: 1,
        name: 'Tất cả đánh giá',
        selected: false
    },
    {
        id: 2,
        name: '3 tháng trước',
        selected: false
    },
    {
        id: 3,
        name: '6 tháng trước',
        selected: false
    },
    {
        id: 4,
        name: '12 tháng qua',
        selected: false
    }
];

export const kinds: TRatingFilter[] = [
    {
        id: 1,
        name: 'Công tác',
        selected: false
    },
    {
        id: 2,
        name: 'Cặp đôi',
        selected: false
    },
    {
        id: 3,
        name: 'Gia đình',
        selected: false
    },
    {
        id: 4,
        name: 'Bạn bè',
        selected: false
    },
    {
        id: 5,
        name: 'Đi một mình',
        selected: false
    },
];