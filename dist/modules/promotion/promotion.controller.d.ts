import { Promotion } from 'src/dto/promotion.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { PromotionRepository } from './promotion.repository';
export declare class PromotionController {
    private promotionRepository;
    constructor(promotionRepository: PromotionRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<Promotion>;
    create(data: Promotion): Promise<boolean>;
    update(id: string, data: Partial<Promotion>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
