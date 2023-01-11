import { Document } from 'mongoose';
import { Image } from './image.dto';
import { Subcategory } from './subcategory.dto';
export declare class PromotionFinal extends Document {
    image: Partial<Image>;
    subcategory: Partial<Subcategory>;
}
