import { Model } from 'mongoose';
import { Subcategory } from 'src/dto/subcategory.dto';
import { Order } from '../../dto/order.dto';
import { User } from '../../dto/user.dto';
import { Price } from '../../dto/price.dto';
import { NOTIFICATION } from '../../enums/notification.enum';
export declare class NotificationsRepository {
    private notificationDb;
    private usersDb;
    private orderDb;
    constructor(notificationDb: Model<any>, usersDb: Model<User>, orderDb: Model<Order>);
    createdProduct(subcategory: Subcategory): Promise<any>;
    subcategoryDiscount(document: Subcategory): Promise<any>;
    newOrder(type: NOTIFICATION, order: string): Promise<any>;
    updateEnvio(precios: Price): Promise<any>;
    finishSoldOut(document: Subcategory): Promise<any>;
}
