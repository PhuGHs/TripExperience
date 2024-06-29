import { TUser } from "./user.type";

export type TPlan = {
    user: TUser;
    travelPlanId: number;
    travelPlanName: string;
    planCreateAt: string;
    travelDate: string;
    travelDescription: string;
    travelUrl: string;
    userId: string;
    planDetails: TPlanDetail[];
}

export type TPlanToPost = {
    travelPlanName: string;
    travelDescription: string;
    travelUrl: string;
    userId: string;
}

export type TPlanDetail = {
    plantDetailId: number;
    planDetailDescription: string;
    locationId: number;
    travelPlanId: number;
}

export type TPlanUpdate = {
    travelPlanId: number;
    travelPlanName: string;
    travelDescription: string;
    travelUrl: string;
    userId: string;
}

export type TPlanAddLocation = {
    planDetailDescription: string;
    locationId: number;
    travelPlanId: number;
}