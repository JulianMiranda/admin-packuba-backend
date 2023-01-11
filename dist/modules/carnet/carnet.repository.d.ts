import { Model } from 'mongoose';
import { Carnet } from '../../dto/carnet.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
export declare class CarnetRepository {
    private carnetDb;
    readonly type = ENTITY.CARNET;
    constructor(carnetDb: Model<Carnet>);
    getList(query: MongoQuery): Promise<any>;
    getListUnAuth(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<Carnet>;
    create(data: Carnet): Promise<boolean>;
    update(id: string, data: Partial<Carnet>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
