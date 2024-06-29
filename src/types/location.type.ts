import { TCity } from './city.type';
import { TLocationMedia } from './media.type';

export type TLocation = {
    locationId: number;
    locationName: string;
    locationAddress: string;
    locationOpenTiem: string;
    locationLongtitude: number;
    locationLatitude: number;
    city: TCity;
    cityName: string;
    locationRateAverage: number;
    ratingStatistic: TRatingStatistic;
    locationMedias: TLocationMedia[]
};

export type TRatingStatistic = {
    1: number,
    2: number,
    3: number,
    4: number,
    5: number
}

export type TSearch<T> = {
    result: T,
    isCity: boolean,
    isLocation: boolean
}

export type TLocationGet = {
    location: TLocation;
    locationMedias: TLocationMedia[];
}
