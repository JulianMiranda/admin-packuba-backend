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
exports.ImageRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ImageRepository = class ImageRepository {
    constructor(imageDb) {
        this.imageDb = imageDb;
    }
    async getImages(data, isMain = false) {
        try {
            const { parentId, parentType } = data;
            const select = isMain ? { url: true } : {};
            return this.imageDb.find({ parentId, parentType, status: true }, Object.assign({}, select));
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('getImages Database error', e);
        }
    }
    async insertImages(images) {
        try {
            return this.imageDb.insertMany(images);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('createImage Database error', e);
        }
    }
    async deleteImages(images) {
        try {
            const bulk = images.map((_id) => {
                return {
                    updateOne: {
                        filter: { _id },
                        update: {
                            $set: { status: false },
                        },
                    },
                };
            });
            return await this.imageDb.bulkWrite(bulk);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('deleteImage Database error', e);
        }
    }
    async deleteImagesByTypeAndId(parentType, parentId) {
        try {
            const deletedImages = await this.imageDb.updateMany({ parentType, parentId }, { status: false });
            return !!deletedImages;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('deleteImage Database error', e);
        }
    }
};
ImageRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Image')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ImageRepository);
exports.ImageRepository = ImageRepository;
//# sourceMappingURL=image.repository.js.map