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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const firebase_service_1 = require("../../services/firebase.service");
const entity_enum_1 = require("../../enums/entity.enum");
const image_repository_1 = require("../image/image.repository");
let UserRepository = class UserRepository {
    constructor(userDb, imageRepository) {
        this.userDb = userDb;
        this.imageRepository = imageRepository;
        this.type = entity_enum_1.ENTITY.USERS;
    }
    async getList(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, users] = await Promise.all([
                this.userDb.countDocuments(filter),
                this.userDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: users };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter users Database error', e);
        }
    }
    async getOne(id) {
        try {
            const document = await this.userDb.findOne({ _id: id }).populate([
                {
                    path: 'image',
                    match: { status: true },
                    select: { url: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find user for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findUser Database error', e);
        }
    }
    async update(id, data, image) {
        try {
            const { newFavorite, removeFavorite } = data, rest = __rest(data, ["newFavorite", "removeFavorite"]);
            const a = '';
            if (newFavorite) {
                await this.userDb.findOneAndUpdate({ _id: id }, { $addToSet: { favoriteUnits: newFavorite } });
            }
            if (removeFavorite) {
                await this.userDb.findOneAndUpdate({ _id: id }, { $pull: { favoriteUnits: removeFavorite } });
            }
            let newImage = {};
            if (image) {
                await this.imageRepository.deleteImagesByTypeAndId(this.type, id);
                image.parentType = this.type;
                image.parentId = id;
                const imageModel = await this.imageRepository.insertImages([image]);
                newImage = { image: imageModel[0]._id };
            }
            const document = await this.userDb
                .findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, rest), newImage), { new: true })
                .select({
                name: true,
                email: true,
                image: true,
                preferences: true,
                role: true,
                favoriteUnits: true,
                lastNotificationCheck: true,
                firebaseId: true,
            })
                .populate([
                {
                    path: 'image',
                    match: { status: true },
                    select: { url: true, blurHash: true },
                },
            ]);
            const { role } = rest;
            if (role) {
                const { firebaseId, _id } = document;
                const claims = { role, mongoId: _id };
                firebase_service_1.FirebaseService.setClaims(firebaseId, claims);
            }
            if (!document)
                throw new common_1.NotFoundException(`Could not find user to update for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updateUser Database error', e);
        }
    }
    async delete(id) {
        try {
            const document = await this.userDb.findOneAndUpdate({ _id: id }, { status: false });
            if (!document)
                throw new common_1.NotFoundException(`Could not find user to delete for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteUser Database error', e);
        }
    }
};
UserRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        image_repository_1.ImageRepository])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map