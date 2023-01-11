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
exports.PriceRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entity_enum_1 = require("../../enums/entity.enum");
const notifications_repository_1 = require("../notifications/notifications.repository");
let PriceRepository = class PriceRepository {
    constructor(priceDb, notificationsRepository) {
        this.priceDb = priceDb;
        this.notificationsRepository = notificationsRepository;
        this.type = entity_enum_1.ENTITY.PRICE;
    }
    async getPrices() {
        try {
            const prices = await this.priceDb.find();
            return { prices: prices[0] };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter prices Database error', e);
        }
    }
    async update(data) {
        try {
            const document = await this.priceDb.find();
            await this.priceDb.findOneAndUpdate({ _id: document[0]._id }, Object.assign({}, data), { new: true });
            if (!document)
                throw new common_1.NotFoundException(`Could not find price to update`);
            const newPrices = await this.priceDb.find();
            this.notificationsRepository.updateEnvio(newPrices[0]);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updatePrice Database error', e);
        }
    }
};
PriceRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Price')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_repository_1.NotificationsRepository])
], PriceRepository);
exports.PriceRepository = PriceRepository;
//# sourceMappingURL=price.repository.js.map