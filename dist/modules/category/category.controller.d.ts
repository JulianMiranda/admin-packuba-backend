import { Category } from 'src/dto/category.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { CategoryRepository } from './category.repository';
export declare class CategoryController {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<Category>;
    create(data: Category): Promise<boolean>;
    update(id: string, data: Partial<Category>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
