import { PromotionFinal } from 'src/dto/promotionFinal.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { PromotionFinalRepository } from './promotionFinal.repository';
export declare class PromotionFinalController {
    private promotionFinalRepository;
    constructor(promotionFinalRepository: PromotionFinalRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<PromotionFinal>;
    create(data: PromotionFinal): Promise<boolean>;
    update(id: string, data: Partial<PromotionFinal>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
