import { Model } from 'mongoose';
import { Image } from '../../dto/image.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { Subcategory } from '../../dto/subcategory.dto';
import { ENTITY } from '../../enums/entity.enum';
import { ImageRepository } from '../image/image.repository';
import { NotificationsRepository } from '../notifications/notifications.repository';
export declare class SubcategoryRepository {
    private subcategoryDb;
    private imageRepository;
    private notificationsRepository;
    readonly type = ENTITY.SUBCATEGORY;
    constructor(subcategoryDb: Model<Subcategory>, imageRepository: ImageRepository, notificationsRepository: NotificationsRepository);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<Subcategory>;
    getProduct(id: string): Promise<Subcategory>;
    create(data: Subcategory, images: Array<Partial<Image>>): Promise<boolean>;
    update(id: string, data: Partial<Subcategory>, images: Array<Partial<Image>>, deleteImages: string[]): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    setPrice(): Promise<boolean>;
    searchTextSearch(): Promise<void>;
    setTextSearch(id: string): Promise<void>;
    findTilde(a: string): any;
}
