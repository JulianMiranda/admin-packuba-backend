import { Order } from 'src/dto/order.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { OrderRepository } from './order.repository';
export declare class OrderController {
    private orderRepository;
    constructor(orderRepository: OrderRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<Order>;
    setOrder(data: Order): Promise<boolean>;
    create(data: Order): Promise<boolean>;
    update(id: string, data: Partial<Order>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
