import { Model } from 'mongoose';
import { Category } from '../../dto/category.dto';
import { Image } from '../../dto/image.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
import { ImageRepository } from '../image/image.repository';
export declare class CategoryRepository {
    private categoryDb;
    private imageRepository;
    readonly type = ENTITY.CATEGORY;
    constructor(categoryDb: Model<Category>, imageRepository: ImageRepository);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<Category>;
    create(data: Category, image: Partial<Image>): Promise<boolean>;
    update(id: string, data: Partial<Category>, image: Partial<Image>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
