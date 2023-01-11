import { Model } from 'mongoose';
import { Price } from '../../dto/price.dto';
import { ENTITY } from '../../enums/entity.enum';
import { NotificationsRepository } from '../notifications/notifications.repository';
export declare class PriceRepository {
    private priceDb;
    private notificationsRepository;
    readonly type = ENTITY.PRICE;
    constructor(priceDb: Model<Price>, notificationsRepository: NotificationsRepository);
    getPrices(): Promise<any>;
    update(data: Partial<Price>): Promise<boolean>;
}
