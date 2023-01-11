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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const authentication_guard_1 = require("../../guards/authentication.guard");
const role_repository_1 = require("./role.repository");
let RoleController = class RoleController {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    getRoles() {
        return this.roleRepository.getRoles();
    }
};
__decorate([
    common_1.Get('/getRoles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoles", null);
RoleController = __decorate([
    common_1.Controller(),
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map