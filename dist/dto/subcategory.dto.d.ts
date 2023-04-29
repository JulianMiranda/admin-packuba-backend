import { Document } from 'mongoose';
import { Image } from './image.dto';
export declare class Subcategory extends Document {
    name: string;
    images: Array<Partial<Image>>;
    deleteImages: string[];
    category: string;
    weight: number;
    description: Record<string, string>[];
    cost: number;
    price: number;
    priceGalore: number;
    priceGaloreDiscount: number;
    priceDiscount: number;
    currency: string;
    stock: number;
    aviableSizes: string[];
    aviableColors: string[];
    soldOut: boolean;
    createdAt: Date;
    recentProduct: Date;
}
