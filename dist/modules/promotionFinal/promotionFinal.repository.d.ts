import { Model } from 'mongoose';
import { PromotionFinal } from '../../dto/promotionFinal.dto';
import { Image } from '../../dto/image.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
import { ImageRepository } from '../image/image.repository';
export declare class PromotionFinalRepository {
    private promotionFinalDb;
    private imageRepository;
    readonly type = ENTITY.PROMOTIONFINAL;
    constructor(promotionFinalDb: Model<PromotionFinal>, imageRepository: ImageRepository);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<PromotionFinal>;
    create(data: PromotionFinal, image: Partial<Image>): Promise<boolean>;
    update(id: string, data: Partial<PromotionFinal>, image: Partial<Image>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
