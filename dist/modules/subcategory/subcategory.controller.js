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
exports.SubcategoryController = void 0;
const common_1 = require("@nestjs/common");
const subcategory_dto_1 = require("../../dto/subcategory.dto");
const authentication_guard_1 = require("../../guards/authentication.guard");
const mongo_query_dto_1 = require("../../dto/mongo-query.dto");
const entity_enum_1 = require("../../enums/entity.enum");
const accepted_props_pipe_1 = require("../../pipes/accepted-props.pipe");
const required_props_pipe_1 = require("../../pipes/required-props.pipe");
const transform_query_pipe_1 = require("../../pipes/transform-query.pipe");
const subcategory_repository_1 = require("./subcategory.repository");
let SubcategoryController = class SubcategoryController {
    constructor(subcategoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
    }
    getList(query) {
        return this.subcategoryRepository.getList(query);
    }
    getOne(id) {
        return this.subcategoryRepository.getOne(id);
    }
    create(data) {
        const { images } = data;
        delete data.images;
        return this.subcategoryRepository.create(data, images);
    }
    update(id, data) {
        const { images, deleteImages } = data;
        delete data.images;
        delete data.deleteImages;
        return this.subcategoryRepository.update(id, data, images, deleteImages);
    }
    delete(id) {
        return this.subcategoryRepository.delete(id);
    }
    setPrice() {
        return this.subcategoryRepository.setPrice();
    }
    getProduct(id) {
        return this.subcategoryRepository.getProduct(id);
    }
};
__decorate([
    common_1.Post('/getList'),
    common_1.UsePipes(new transform_query_pipe_1.TransformQuery()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_query_dto_1.MongoQuery]),
    __metadata("design:returntype", Object)
], SubcategoryController.prototype, "getList", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Get('/getOne/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "getOne", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Post('/create'),
    common_1.UsePipes(new required_props_pipe_1.RequiredProps(entity_enum_1.ENTITY.SUBCATEGORY)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subcategory_dto_1.Subcategory]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "create", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Put('/update/:id'),
    common_1.UsePipes(new accepted_props_pipe_1.AcceptedProps(entity_enum_1.ENTITY.SUBCATEGORY)),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "update", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "delete", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Get('/setPrice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "setPrice", null);
__decorate([
    common_1.Get('/getProduct/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoryController.prototype, "getProduct", null);
SubcategoryController = __decorate([
    common_1.Controller(entity_enum_1.ENTITY.SUBCATEGORY),
    __metadata("design:paramtypes", [subcategory_repository_1.SubcategoryRepository])
], SubcategoryController);
exports.SubcategoryController = SubcategoryController;
//# sourceMappingURL=subcategory.controller.js.map