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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceController = void 0;
const common_1 = require("@nestjs/common");
const price_dto_1 = require("../../dto/price.dto");
const authentication_guard_1 = require("../../guards/authentication.guard");
const entity_enum_1 = require("../../enums/entity.enum");
const accepted_props_pipe_1 = require("../../pipes/accepted-props.pipe");
const price_repository_1 = require("./price.repository");
let PriceController = class PriceController {
    constructor(priceRepository) {
        this.priceRepository = priceRepository;
    }
    getPrices() {
        return this.priceRepository.getPrices();
    }
    getPricesUnAuth() {
        return this.priceRepository.getPrices();
    }
    update(data) {
        return this.priceRepository.update(data);
    }
};
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Get('/getPrices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], PriceController.prototype, "getPrices", null);
__decorate([
    common_1.Get('/getPricesNoAuth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], PriceController.prototype, "getPricesUnAuth", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Put('/updatePrices'),
    common_1.UsePipes(new accepted_props_pipe_1.AcceptedProps(entity_enum_1.ENTITY.PRICE)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "update", null);
PriceController = __decorate([
    common_1.Controller(entity_enum_1.ENTITY.PRICE),
    __metadata("design:paramtypes", [price_repository_1.PriceRepository])
], PriceController);
exports.PriceController = PriceController;
//# sourceMappingURL=price.controller.js.map