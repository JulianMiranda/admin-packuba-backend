import { Order } from '../dto/order.dto';
import { User } from '../dto/user.dto';
export declare class SendGridService {
    private static readonly logger;
    static init(): void;
    static sendGrid(data: Partial<Order>, user: Partial<User>): Promise<void>;
}
