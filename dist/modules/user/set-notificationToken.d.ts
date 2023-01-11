import * as mongoose from 'mongoose';
export declare const setNotificationToken: (userId: string, notificationToken: string) => ({
    $match: {
        user: mongoose.Types.ObjectId;
    };
    $notificationTokens?: undefined;
} | {
    $notificationTokens: {
        addToSet: string;
    };
    $match?: undefined;
})[];
