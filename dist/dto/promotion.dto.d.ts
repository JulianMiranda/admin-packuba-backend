import { Document } from 'mongoose';
import { Image } from './image.dto';
export declare class Promotion extends Document {
    image: Partial<Image>;
}
