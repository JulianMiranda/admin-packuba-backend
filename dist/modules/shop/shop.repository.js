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
exports.ShopRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const my_shop_dto_1 = require("../../dto/my-shop.dto");
const entity_enum_1 = require("../../enums/entity.enum");
const my_shop_aggregate_1 = require("./my-shop.aggregate");
let ShopRepository = class ShopRepository {
    constructor(shopDb) {
        this.shopDb = shopDb;
        this.type = entity_enum_1.ENTITY.MYSHOP;
    }
    async getList(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, shop] = await Promise.all([
                this.shopDb.countDocuments(filter),
                this.shopDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: shop };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter shop Database error', e);
        }
    }
    async getOne(id) {
        try {
            const document = await this.shopDb.findOne({ _id: id }).populate([
                {
                    path: 'image',
                    match: { status: true },
                    select: { url: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find shop for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findShop Database error', e);
        }
    }
    async getMyShop(id) {
        try {
            const document = await this.shopDb.aggregate(my_shop_aggregate_1.myShop(id));
            if (!document)
                throw new common_1.NotFoundException(`Could not find shop for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findShop Database error', e);
        }
    }
    async setMyShop(data) {
        try {
            const { user } = data;
            const previousShop = await this.shopDb.findOne({ user });
            if (previousShop) {
                const document = await this.shopDb.findOneAndUpdate({ user }, Object.assign({}, data));
                if (!document)
                    throw new common_1.NotFoundException(`Could not find shop to update for id: ${user}`);
                return !!document;
            }
            else {
                const newShop = new this.shopDb(data);
                const document = await newShop.save();
                return !!document;
            }
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findShop Database error', e);
        }
    }
    async create(data) {
        try {
            const newShop = new this.shopDb(data);
            const document = await newShop.save();
            return !!document;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('createShop Database error', e);
        }
    }
    async update(id, data) {
        try {
            const document = await this.shopDb.findOneAndUpdate({ _id: id }, Object.assign({}, data));
            if (!document)
                throw new common_1.NotFoundException(`Could not find shop to update for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updateShop Database error', e);
        }
    }
    async delete(id) {
        try {
            const document = await this.shopDb.findOneAndUpdate({ _id: id }, { status: false });
            if (!document)
                throw new common_1.NotFoundException(`Could not find shop to delete for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteShop Database error', e);
        }
    }
};
ShopRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('MyShop')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ShopRepository);
exports.ShopRepository = ShopRepository;
//# sourceMappingURL=shop.repository.js.map