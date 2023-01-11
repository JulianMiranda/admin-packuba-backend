"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../services/firebase.service");
const roles_enum_1 = require("../enums/roles.enum");
const role_repository_1 = require("../modules/role/role.repository");
const index_1 = require("../utils/index");
let GetUserMiddleware = class GetUserMiddleware {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async use(req, res, next) {
        const token = req.headers['x-token'];
        if (!token) {
            next();
            return;
        }
        try {
            const firebaseInfo = await firebase_service_1.FirebaseService.getAdmin
                .auth()
                .verifyIdToken(token);
            if (firebaseInfo) {
                if (!firebaseInfo.name)
                    throw new common_1.ServiceUnavailableException('Please login again');
                const user = {
                    firebaseId: firebaseInfo.sub,
                    name: firebaseInfo.name,
                    image: firebaseInfo.picture
                        ? firebaseInfo.picture
                        : index_1.getDefaultImage(firebaseInfo.name),
                    role: firebaseInfo.role || roles_enum_1.ROLES.CUN,
                };
                if (firebaseInfo.email)
                    user.email = firebaseInfo.email;
                if (firebaseInfo.phone_number)
                    user.phone = firebaseInfo.phone_number;
                if (firebaseInfo.mongoId)
                    user.id = firebaseInfo.mongoId;
                (user.permissions = this.roleRepository.getRoles()[user.role]),
                    (req['user'] = user);
            }
        }
        catch (e) {
            if (e.status === 503)
                throw e;
            else
                throw new common_1.UnauthorizedException('Authentication error', e);
        }
        next();
    }
};
GetUserMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], GetUserMiddleware);
exports.GetUserMiddleware = GetUserMiddleware;
//# sourceMappingURL=get-user.middleware.js.map