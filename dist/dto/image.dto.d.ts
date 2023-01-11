import { Document } from 'mongoose';
export declare class Image extends Document {
    url?: string;
    parentType?: string;
    parentId?: string;
}
