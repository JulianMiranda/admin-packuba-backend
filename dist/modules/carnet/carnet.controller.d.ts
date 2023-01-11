import { Carnet } from 'src/dto/carnet.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { CarnetRepository } from './carnet.repository';
export declare class CarnetController {
    private carnetRepository;
    constructor(carnetRepository: CarnetRepository);
    getList(query: MongoQuery): any;
    getListUnAuth(query: MongoQuery): any;
    getOne(id: string): Promise<Carnet>;
    create(data: Carnet): Promise<boolean>;
    update(id: string, data: Partial<Carnet>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
