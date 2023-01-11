import { Image } from 'src/dto/image.dto';
import { ImageRepository } from './image.repository';
export declare class ImageController {
    private imageRepository;
    constructor(imageRepository: ImageRepository);
    getImages(data: Partial<Image>): Promise<Image[]>;
    insertImages(data: any): Promise<Image[]>;
    deleteImages(data: any): Promise<boolean>;
}
