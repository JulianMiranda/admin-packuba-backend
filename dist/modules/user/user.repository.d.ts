import { Model } from 'mongoose';
import { Image } from '../../dto/image.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { User } from '../../dto/user.dto';
import { ENTITY } from '../../enums/entity.enum';
import { ImageRepository } from '../image/image.repository';
export declare class UserRepository {
    private userDb;
    private imageRepository;
    readonly type = ENTITY.USERS;
    constructor(userDb: Model<User>, imageRepository: ImageRepository);
    getList(query: MongoQuery): Promise<any>;
    getOne(id: string): Promise<User>;
    update(id: string, data: Partial<User>, image: Partial<Image>): Promise<User>;
    delete(id: string): Promise<boolean>;
}
