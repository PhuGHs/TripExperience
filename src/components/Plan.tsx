import { TPlan } from '@type/plan.type';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IPlan {
    press: () => void;
    plan?: TPlan;
}

const Plan = ({ press, plan }: IPlan) => {
    const formatDate = (date) => {
        const inputDate = new Date(date);

        const year = inputDate.getUTCFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDate.getDate().toString().padStart(2, "0");

        const time =
            inputDate.getHours().toString().padStart(2, "0") +
            ":" +
            inputDate.getMinutes().toString().padStart(2, "0");

        const formattedDate = `${day} tháng ${month}`;
        return formattedDate;
    }

    return (
        <View className='mb-7'>
            <TouchableOpacity className='mb-2'
                onPress={press}
            >
                <Image source={{ uri: `${plan.travelUrl}` }}
                    style={{ height: 150, width: "100%", borderRadius: 10 }}
                />
            </TouchableOpacity>
            <Text className='mb-2 font-bold text-primary'>{plan.travelPlanName}</Text>
            <Text className='font-medium text-primary'>{formatDate(plan.planCreateAt)}</Text>
        </View>
    );
};

export default Plan;
