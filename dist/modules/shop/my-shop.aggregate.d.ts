import * as mongoose from 'mongoose';
export declare const myShop: (userId: string) => {
    $match: {
        user: mongoose.Types.ObjectId;
    };
}[];
