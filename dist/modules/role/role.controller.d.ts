import { RoleRepository } from './role.repository';
export declare class RoleController {
    private roleRepository;
    constructor(roleRepository: RoleRepository);
    getRoles(): Promise<any>;
}
