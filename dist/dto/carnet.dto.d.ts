import { Document } from 'mongoose';
export declare class Carnet extends Document {
    name: string;
    carnet: string;
    address: string;
    municipio: string;
    provincia: string;
    phoneNumber: string;
    user: string;
}
