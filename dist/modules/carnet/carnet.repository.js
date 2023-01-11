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
exports.CarnetRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entity_enum_1 = require("../../enums/entity.enum");
let CarnetRepository = class CarnetRepository {
    constructor(carnetDb) {
        this.carnetDb = carnetDb;
        this.type = entity_enum_1.ENTITY.CARNET;
    }
    async getList(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, carnets] = await Promise.all([
                this.carnetDb.countDocuments(filter),
                this.carnetDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: carnets };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter carnets Database error', e);
        }
    }
    async getListUnAuth(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, carnets] = await Promise.all([
                this.carnetDb.countDocuments(filter),
                this.carnetDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: carnets };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter carnets Database error', e);
        }
    }
    async getOne(id) {
        try {
            const document = await this.carnetDb.findOne({ _id: id }).populate([
                {
                    path: 'user',
                    match: { status: true },
                    select: { name: true, phone: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find carnet for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findCarnet Database error', e);
        }
    }
    async create(data) {
        try {
            const newCarnet = new this.carnetDb(data);
            const document = await newCarnet.save();
            return !!document;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('createCarnet Database error', e);
        }
    }
    async update(id, data) {
        try {
            const document = await this.carnetDb.findOneAndUpdate({ _id: id }, Object.assign({}, data));
            if (!document)
                throw new common_1.NotFoundException(`Could not find carnet to update for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updateCarnet Database error', e);
        }
    }
    async delete(id) {
        try {
            const document = await this.carnetDb.findOneAndUpdate({ _id: id }, { status: false });
            if (!document)
                throw new common_1.NotFoundException(`Could not find carnet to delete for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteCarnet Database error', e);
        }
    }
};
CarnetRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Carnet')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarnetRepository);
exports.CarnetRepository = CarnetRepository;
//# sourceMappingURL=carnet.repository.js.map