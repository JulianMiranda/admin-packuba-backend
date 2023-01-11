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
exports.PromotionRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entity_enum_1 = require("../../enums/entity.enum");
const image_repository_1 = require("../image/image.repository");
let PromotionRepository = class PromotionRepository {
    constructor(promotionDb, imageRepository) {
        this.promotionDb = promotionDb;
        this.imageRepository = imageRepository;
        this.type = entity_enum_1.ENTITY.PROMOTION;
    }
    async getList(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, promotions] = await Promise.all([
                this.promotionDb.countDocuments(filter),
                this.promotionDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: promotions };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter promotions Database error', e);
        }
    }
    async getOne(id) {
        try {
            const document = await this.promotionDb.findOne({ _id: id }).populate([
                {
                    path: 'image',
                    match: { status: true },
                    select: { url: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find promotion for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findPromotion Database error', e);
        }
    }
    async create(data, image) {
        try {
            const newPromotion = new this.promotionDb(data);
            const document = await newPromotion.save();
            image.parentType = this.type;
            image.parentId = document._id;
            const imageModel = await this.imageRepository.insertImages([image]);
            return !!(await this.promotionDb.findOneAndUpdate({ _id: document._id }, { image: imageModel[0]._id }));
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('createPromotion Database error', e);
        }
    }
    async update(id, data, image) {
        try {
            let newImage = {};
            if (image) {
                await this.imageRepository.deleteImagesByTypeAndId(this.type, id);
                image.parentType = this.type;
                image.parentId = id;
                const imageModel = await this.imageRepository.insertImages([image]);
                newImage = { image: imageModel[0]._id };
            }
            const document = await this.promotionDb.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, data), newImage));
            if (!document)
                throw new common_1.NotFoundException(`Could not find promotion to update for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updatePromotion Database error', e);
        }
    }
    async delete(id) {
        try {
            const document = await this.promotionDb.findOneAndUpdate({ _id: id }, { status: false });
            if (!document)
                throw new common_1.NotFoundException(`Could not find promotion to delete for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deletePromotion Database error', e);
        }
    }
};
PromotionRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Promotion')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        image_repository_1.ImageRepository])
], PromotionRepository);
exports.PromotionRepository = PromotionRepository;
//# sourceMappingURL=promotion.repository.js.map