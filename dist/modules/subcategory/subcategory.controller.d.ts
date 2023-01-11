import { Subcategory } from 'src/dto/subcategory.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { SubcategoryRepository } from './subcategory.repository';
export declare class SubcategoryController {
    private subcategoryRepository;
    constructor(subcategoryRepository: SubcategoryRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<Subcategory>;
    create(data: Subcategory): Promise<boolean>;
    update(id: string, data: Partial<Subcategory>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    setPrice(): Promise<Boolean>;
    getProduct(id: string): Promise<Subcategory>;
}
