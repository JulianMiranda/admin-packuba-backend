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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const my_shop_dto_1 = require("../../dto/my-shop.dto");
const authentication_guard_1 = require("../../guards/authentication.guard");
const mongo_query_dto_1 = require("../../dto/mongo-query.dto");
const entity_enum_1 = require("../../enums/entity.enum");
const accepted_props_pipe_1 = require("../../pipes/accepted-props.pipe");
const required_props_pipe_1 = require("../../pipes/required-props.pipe");
const transform_query_pipe_1 = require("../../pipes/transform-query.pipe");
const shop_repository_1 = require("./shop.repository");
let ShopController = class ShopController {
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
    }
    getList(query) {
        return this.shopRepository.getList(query);
    }
    getOne(id) {
        return this.shopRepository.getOne(id);
    }
    getMyShop(req) {
        return this.shopRepository.getMyShop(req.user.id);
    }
    setMyShop(data) {
        return this.shopRepository.setMyShop(data);
    }
    create(data) {
        return this.shopRepository.create(data);
    }
    update(id, data) {
        return this.shopRepository.update(id, data);
    }
    delete(id) {
        return this.shopRepository.delete(id);
    }
};
__decorate([
    common_1.Post('/getList'),
    common_1.UsePipes(new transform_query_pipe_1.TransformQuery()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_query_dto_1.MongoQuery]),
    __metadata("design:returntype", Object)
], ShopController.prototype, "getList", null);
__decorate([
    common_1.Get('/getOne/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getOne", null);
__decorate([
    common_1.Get('/getMyShop'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getMyShop", null);
__decorate([
    common_1.Post('/setMyShop'),
    common_1.UsePipes(new required_props_pipe_1.RequiredProps(entity_enum_1.ENTITY.MYSHOP)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [my_shop_dto_1.MyShop]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "setMyShop", null);
__decorate([
    common_1.Post('/create'),
    common_1.UsePipes(new required_props_pipe_1.RequiredProps(entity_enum_1.ENTITY.MYSHOP)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [my_shop_dto_1.MyShop]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "create", null);
__decorate([
    common_1.Put('/update/:id'),
    common_1.UsePipes(new accepted_props_pipe_1.AcceptedProps(entity_enum_1.ENTITY.MYSHOP)),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "update", null);
__decorate([
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "delete", null);
ShopController = __decorate([
    common_1.Controller(entity_enum_1.ENTITY.MYSHOP),
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    __metadata("design:paramtypes", [shop_repository_1.ShopRepository])
], ShopController);
exports.ShopController = ShopController;
//# sourceMappingURL=shop.controller.js.map