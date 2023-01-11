import { MyShop } from 'src/dto/my-shop.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ShopRepository } from './shop.repository';
export declare class ShopController {
    private shopRepository;
    constructor(shopRepository: ShopRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<MyShop>;
    getMyShop(req: any): Promise<Array<any>>;
    setMyShop(data: MyShop): Promise<boolean>;
    create(data: MyShop): Promise<boolean>;
    update(id: string, data: Partial<MyShop>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
