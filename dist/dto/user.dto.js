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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class User extends mongoose_1.Document {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "firebaseId", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], User.prototype, "online", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], User.prototype, "reciveNotifications", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "serviceZone", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsPhoneNumber(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "defaultImage", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "newFavorite", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "removeFavorite", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "notificationTokens", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "theme", void 0);
exports.User = User;
//# sourceMappingURL=user.dto.js.map