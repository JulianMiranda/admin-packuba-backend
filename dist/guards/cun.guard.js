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
exports.JunGuard = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../enums/roles.enum");
const authorization_guard_1 = require("./authorization.guard");
let JunGuard = class JunGuard extends authorization_guard_1.AuthorizationGuard {
    constructor() {
        super([roles_enum_1.ROLES.ADMIN, roles_enum_1.ROLES.JUN]);
    }
};
JunGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JunGuard);
exports.JunGuard = JunGuard;
//# sourceMappingURL=cun.guard.js.map