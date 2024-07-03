import { TCity } from './city.type';

export type TUser = {
    id: string;
    userName: string;
    email: string;
    password: string;
    male: boolean;
    dateBirth: string;
    avatar: string;
    city: TCity,
    cityId: number,
    userDescription: string
};

export type TPutUser = {
    userId: string,
    cityId: number,
    userDescription: string,
    avatar: string
}
