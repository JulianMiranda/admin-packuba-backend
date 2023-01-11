import { User } from 'src/dto/user.dto';
import { AuthRepository } from './auth.repository';
export declare class AuthController {
    private _authRepo;
    constructor(_authRepo: AuthRepository);
    login(req: any): Promise<User>;
}
