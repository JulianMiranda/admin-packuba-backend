import { Model } from 'mongoose';
import { MyShop } from 'src/dto/my-shop.dto';
import { Order } from 'src/dto/order.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
import { NotificationsRepository } from '../notifications/notifications.repository';
import { User } from '../../dto/user.dto';
export declare class OrderRepository {
    private orderDb;
    private shopDb;
    private userDb;
    private notificationsRepository;
    readonly type = ENTITY.ORDER;
    constructor(orderDb: Model<Order>, shopDb: Model<MyShop>, userDb: Model<User>, notificationsRepository: NotificationsRepository);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<Order>;
    setOrder(data: Order): Promise<boolean>;
    create(data: Order): Promise<boolean>;
    update(id: string, data: Partial<Order>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
