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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_dto_1 = require("../../dto/user.dto");
const firebase_service_1 = require("../../services/firebase.service");
const entity_enum_1 = require("../../enums/entity.enum");
const image_repository_1 = require("../image/image.repository");
let AuthRepository = class AuthRepository {
    constructor(userDb, imageRepository) {
        this.userDb = userDb;
        this.imageRepository = imageRepository;
        this.type = entity_enum_1.ENTITY.USERS;
    }
    async login(user) {
        try {
            if (user.id) {
                console.log(`Se ha logueado el usuario: ${user.id}`);
                return this.userDb
                    .findById(user.id, {
                    name: true,
                    email: true,
                    role: true,
                    image: true,
                    theme: true,
                    phone: true,
                    reciveNotifications: true,
                })
                    .populate([
                    {
                        path: 'image',
                        match: { status: true },
                        select: { url: true },
                    },
                ]);
            }
            return await this.RegisterUser(user);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Login Database error', e);
        }
    }
    async RegisterUser(user) {
        try {
            const { image } = user, rest = __rest(user, ["image"]);
            const registeredUser = await new this.userDb(rest).save();
            const claims = { role: user.role, mongoId: registeredUser.id };
            firebase_service_1.FirebaseService.setClaims(user.firebaseId, claims);
            const setImage = {
                url: image,
                parentType: this.type,
                parentId: registeredUser.id,
            };
            const imageModel = await this.imageRepository.insertImages([setImage]);
            return await this.userDb
                .findOneAndUpdate({ _id: registeredUser.id }, { image: imageModel[0]._id }, { new: true })
                .select({
                name: true,
                email: true,
                image: true,
                role: true,
                theme: true,
                phone: true,
                reciveNotifications: true,
            })
                .populate([
                {
                    path: 'image',
                    match: { status: true },
                    select: { url: true },
                },
            ]);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Register Mongo Database error', e);
        }
    }
};
AuthRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        image_repository_1.ImageRepository])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map