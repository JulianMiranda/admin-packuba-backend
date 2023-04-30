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
exports.SubcategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entity_enum_1 = require("../../enums/entity.enum");
const image_repository_1 = require("../image/image.repository");
const notifications_repository_1 = require("../notifications/notifications.repository");
const searcText_aggregation_1 = require("./searcText.aggregation");
let SubcategoryRepository = class SubcategoryRepository {
    constructor(subcategoryDb, imageRepository, notificationsRepository) {
        this.subcategoryDb = subcategoryDb;
        this.imageRepository = imageRepository;
        this.notificationsRepository = notificationsRepository;
        this.type = entity_enum_1.ENTITY.SUBCATEGORY;
    }
    async getList(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, subcategories] = await Promise.all([
                this.subcategoryDb.countDocuments(filter),
                this.subcategoryDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: subcategories };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter subcategories Database error', e);
        }
    }
    async getOne(id) {
        try {
            const document = await this.subcategoryDb.findOne({ _id: id }).populate([
                {
                    path: 'images',
                    match: { status: true },
                    select: { url: true, updatedAt: true },
                    options: { sort: { updatedAt: 1 } },
                },
                {
                    path: 'category',
                    select: { name: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find subcategory for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findSubcategory Database error', e);
        }
    }
    async getProduct(id) {
        try {
            const document = await this.subcategoryDb.findOne({ _id: id }).populate([
                {
                    path: 'images',
                    match: { status: true },
                    select: { url: true },
                },
                {
                    path: 'category',
                    select: { name: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find subcategory for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findSubcategory Database error', e);
        }
    }
    async create(data, images) {
        try {
            data.recentProduct = new Date();
            const newSubcategory = new this.subcategoryDb(data);
            if (!images) {
                const subcategory = await newSubcategory.save();
                return !!subcategory;
            }
            else {
                const document = await newSubcategory.save();
                const createImages = images.map((image) => {
                    image.parentType = this.type;
                    image.parentId = document._id;
                    return image;
                });
                const imageModel = await this.imageRepository.insertImages(createImages);
                const newImages = imageModel.map((doc) => doc._id);
                await this.setTextSearch(document._id);
                const subcategory = await this.subcategoryDb.findOneAndUpdate({ _id: document._id }, { images: newImages }, { new: true });
                if (subcategory) {
                    this.notificationsRepository.createdProduct(subcategory);
                }
                return !!subcategory;
            }
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('createSubcategory Database error', e);
        }
    }
    async update(id, data, images, deleteImages) {
        try {
            if (images || deleteImages) {
                const storedImages = await this.subcategoryDb
                    .findOne({ _id: id }, { images: true, _id: false })
                    .lean();
                let newImages = [];
                if (images && images.length > 0) {
                    const createImages = images.map((image) => {
                        image.parentType = this.type;
                        image.parentId = id;
                        return image;
                    });
                    const imageModel = await this.imageRepository.insertImages(createImages);
                    newImages = imageModel.map((doc) => doc._id);
                }
                if (deleteImages && deleteImages.length > 0) {
                    this.imageRepository.deleteImages(deleteImages);
                    data.images = [...storedImages.images, ...newImages]
                        .map((imageId) => imageId.toString())
                        .filter((imageId) => deleteImages.indexOf(imageId) === -1);
                }
                else if (newImages.length > 0) {
                    data.images = [...storedImages.images, ...newImages];
                }
            }
            const document = await this.subcategoryDb
                .findOneAndUpdate({ _id: id }, data, { new: true })
                .populate([
                { path: 'unit', select: { name: true } },
                {
                    path: 'images',
                    match: { status: true },
                    select: { url: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find subcategory to update for id: ${id}`);
            if (data.priceDiscount && data.priceDiscount !== 0) {
                this.notificationsRepository.subcategoryDiscount(document);
            }
            if (data.priceGaloreDiscount && data.priceGaloreDiscount !== 0) {
                this.notificationsRepository.subcategoryDiscount(document);
            }
            if (data.hasOwnProperty('soldOut') && !data.soldOut) {
                console.log('Tiene la propiedad soldOut y es falso');
                this.notificationsRepository.finishSoldOut(document);
                await this.subcategoryDb.findOneAndUpdate({ _id: id }, { recentProduct: new Date() }, { new: true });
            }
            if (data.name ||
                data.price ||
                data.priceGalore ||
                data.priceGaloreDiscount ||
                data.priceDiscount ||
                data.description ||
                data.info)
                await this.setTextSearch(id);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updateSubcategory Database error', e);
        }
    }
    async delete(id) {
        try {
            const document = await this.subcategoryDb.findOneAndUpdate({ _id: id }, { status: false });
            if (!document)
                throw new common_1.NotFoundException(`Could not find subcategory to delete for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteSubcategory Database error', e);
        }
    }
    async setPrice() {
        try {
            const subcat = await this.subcategoryDb.find();
            subcat.map(async (item) => {
                await this.subcategoryDb.findByIdAndUpdate(item.id, {
                    price: Math.floor(Math.random() * 10),
                });
            });
            return true;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteSubcategory Database error', e);
        }
    }
    async searchTextSearch() {
        try {
            const document = await this.subcategoryDb.find({});
            document.map(async (category) => await this.setTextSearch(category._id));
            console.log('Finished');
            if (!document)
                throw new common_1.NotFoundException(`Could not set Search all`);
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteSubcategory Database error', e);
        }
    }
    async setTextSearch(id) {
        const categoryQuery = await this.subcategoryDb.aggregate(searcText_aggregation_1.searchText(id));
        if (categoryQuery.length === 0)
            return;
        const texto = this.findTilde(categoryQuery[0].textSearch);
        await this.subcategoryDb.bulkWrite(categoryQuery.map(({ _id, textSearch }) => ({
            updateOne: {
                filter: { _id },
                update: {
                    $set: { textSearch: texto },
                },
            },
        })));
    }
    findTilde(a) {
        const b = a.split(' ');
        const newWords = [];
        b.map((word) => {
            for (let i = 0; i < word.length; i++) {
                const caracter = word.charAt(i);
                if (caracter === 'á' || caracter === 'Á') {
                    const re = /Á/gi;
                    newWords.push(word.replace(re, 'a'));
                }
                else if (caracter === 'é' || caracter === 'É') {
                    const re = /É/gi;
                    newWords.push(word.replace(re, 'e'));
                }
                else if (caracter === 'í' || caracter === 'Í') {
                    console.log('Hay caracter: ' + word);
                    const re = /Í/gi;
                    newWords.push(word.replace(re, 'i'));
                }
                else if (caracter === 'ó' || caracter === 'Ó') {
                    const re = /Ó/gi;
                    newWords.push(word.replace(re, 'o'));
                }
                else if (caracter === 'ú' || caracter === 'Ú') {
                    const re = /Ú/gi;
                    newWords.push(word.replace(re, 'u'));
                }
                else {
                    if (!newWords.includes(word))
                        newWords.push(word);
                }
            }
        });
        return newWords.join(' ');
    }
};
SubcategoryRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Subcategory')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        image_repository_1.ImageRepository,
        notifications_repository_1.NotificationsRepository])
], SubcategoryRepository);
exports.SubcategoryRepository = SubcategoryRepository;
//# sourceMappingURL=subcategory.repository.js.map