import { Model } from 'mongoose';
import { User } from 'src/dto/user.dto';
import { ENTITY } from '../../enums/entity.enum';
import { ImageRepository } from '../image/image.repository';
export declare class AuthRepository {
    private userDb;
    private imageRepository;
    constructor(userDb: Model<User>, imageRepository: ImageRepository);
    readonly type = ENTITY.USERS;
    login(user: User): Promise<User>;
    RegisterUser(user: User): Promise<User>;
}
