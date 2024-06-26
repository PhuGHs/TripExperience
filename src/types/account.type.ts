import { TCity } from './city.type';
import { TUser } from './user.type';

export type TLoginPost = {
    email: string;
    password: string;
};

export type TSignUpPost = {
    userName: string;
    email: string;
    password: string;
    phone: string;
};

export type TAuth = {
    accessToken: string;
    expiresAccessToken: string;
    refreshToken: string;
    expiresRefreshToken: string;
    user: TUser;
};

export type TSignUp = {
    userName: string,
    phone: string,
    city: TCity,
    cityId: number,
    email: string,
    password: string
}
