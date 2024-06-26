import { TCity } from './city.type';
import { TLocationMedia } from './media.type';

export type TLocation = {
    locationId: number;
    locationName: string;
    locationAddress: string;
    locationOpenTime: string;
    locationLongtitude: number;
    locationLatitude: number;
    locationRateAverage: number;
    locationDescription: string,
    city: TCity
    cityName: string,
    ratingStatistic: TRatingStatistic,
    locationMedias: TLocationMedia[];
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