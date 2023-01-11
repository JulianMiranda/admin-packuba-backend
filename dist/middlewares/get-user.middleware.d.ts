import { NestMiddleware } from '@nestjs/common';
import { RoleRepository } from '../modules/role/role.repository';
export declare class GetUserMiddleware implements NestMiddleware {
    private roleRepository;
    constructor(roleRepository: RoleRepository);
    use(req: Request, res: Response, next: () => void): Promise<void>;
}
