import { TLocationMedia } from './media.type';

export type TLocation = {
    locationId: number;
    locationName: string;
    locationAddress: string;
    locationOpenTiem: string;
    locationLongtitude: number;
    locationLatitude: number;
    locationRateAverage: number;
    locationMedias: TLocationMedia[]
};
