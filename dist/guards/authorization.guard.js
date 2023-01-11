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
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
let AuthorizationGuard = class AuthorizationGuard {
    constructor(allowedRoles) {
        this.allowedRoles = allowedRoles;
    }
    canActivate(context) {
        const host = context.switchToHttp();
        const req = host.getRequest();
        const user = req['user'];
        const allowed = this.isAllowed(user.permissions);
        console.log('User is allowed:', allowed);
        if (!allowed) {
            console.log('User is authenticated but not authorized, denying access');
            throw new common_1.ForbiddenException();
        }
        console.log('User is authorized, allowing access');
        return true;
    }
    isAllowed(userRoles) {
        console.log('Comparing roles:', this.allowedRoles, userRoles);
        let allowed = false;
        userRoles.map((role) => {
            console.log('Checking if role is allowed', role);
            if (!allowed && this.allowedRoles.includes(role)) {
                allowed = true;
            }
        });
        return allowed;
    }
};
AuthorizationGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Array])
], AuthorizationGuard);
exports.AuthorizationGuard = AuthorizationGuard;
//# sourceMappingURL=authorization.guard.js.map