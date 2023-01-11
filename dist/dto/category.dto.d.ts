import { Document } from 'mongoose';
import { Image } from './image.dto';
export declare class Category extends Document {
    name: string;
    image: Partial<Image>;
}
