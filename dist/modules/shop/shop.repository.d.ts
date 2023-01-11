import { Model } from 'mongoose';
import { MyShop } from 'src/dto/my-shop.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
export declare class ShopRepository {
    private shopDb;
    readonly type = ENTITY.MYSHOP;
    constructor(shopDb: Model<MyShop>);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<MyShop>;
    getMyShop(id: string): Promise<Array<MyShop>>;
    setMyShop(data: MyShop): Promise<boolean>;
    create(data: MyShop): Promise<boolean>;
    update(id: string, data: Partial<MyShop>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
