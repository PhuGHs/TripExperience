export type TRatingFilter = {
    id: number,
    name: 'Tất cả đánh giá' | '3 tháng trước' | '6 tháng trước' | '12 tháng qua' | 'Công tác' | 'Cặp đôi' | 'Gia đình' | 'Bạn bè' | 'Đi một mình' | string;
    selected: boolean
}

export type TStarFilter = {
    id: number,
    star: number,
    selected: boolean
}