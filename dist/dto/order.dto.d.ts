import { Document } from 'mongoose';
export declare class Order extends Document {
    user: string;
    car: any[];
    cost: number;
    currency: string;
}
