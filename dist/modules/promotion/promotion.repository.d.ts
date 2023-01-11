import { Model } from 'mongoose';
import { Promotion } from '../../dto/promotion.dto';
import { Image } from '../../dto/image.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
import { ImageRepository } from '../image/image.repository';
export declare class PromotionRepository {
    private promotionDb;
    private imageRepository;
    readonly type = ENTITY.PROMOTION;
    constructor(promotionDb: Model<Promotion>, imageRepository: ImageRepository);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<Promotion>;
    create(data: Promotion, image: Partial<Image>): Promise<boolean>;
    update(id: string, data: Partial<Promotion>, image: Partial<Image>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
