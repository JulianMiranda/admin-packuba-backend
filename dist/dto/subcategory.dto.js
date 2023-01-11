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
exports.Subcategory = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class Subcategory extends mongoose_1.Document {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Subcategory.prototype, "name", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Subcategory.prototype, "images", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Subcategory.prototype, "deleteImages", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Subcategory.prototype, "category", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Subcategory.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "cost", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "priceGalore", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "priceGaloreDiscount", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "priceDiscount", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Subcategory.prototype, "currency", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Subcategory.prototype, "stock", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Subcategory.prototype, "aviableSizes", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Subcategory.prototype, "aviableColors", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Subcategory.prototype, "soldOut", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Subcategory.prototype, "createdAt", void 0);
exports.Subcategory = Subcategory;
//# sourceMappingURL=subcategory.dto.js.map