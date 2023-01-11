import { User } from 'src/dto/user.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { UserRepository } from './user.repository';
export declare class UserController {
    private userRepository;
    constructor(userRepository: UserRepository);
    getList(query: MongoQuery): any;
    getOne(id: string): Promise<User>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
}
