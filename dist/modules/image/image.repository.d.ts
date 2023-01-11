import { Model } from 'mongoose';
import { Image } from '../../dto/image.dto';
export declare class ImageRepository {
    private imageDb;
    constructor(imageDb: Model<Image>);
    getImages(data: Partial<Image>, isMain?: boolean): Promise<Image[]>;
    insertImages(images: Array<Partial<Image>>): Promise<Image[]>;
    deleteImages(images: string[]): Promise<any>;
    deleteImagesByTypeAndId(parentType: string, parentId: string): Promise<boolean>;
}
