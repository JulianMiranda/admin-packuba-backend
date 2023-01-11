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
exports.CarnetController = void 0;
const common_1 = require("@nestjs/common");
const carnet_dto_1 = require("../../dto/carnet.dto");
const authentication_guard_1 = require("../../guards/authentication.guard");
const mongo_query_dto_1 = require("../../dto/mongo-query.dto");
const entity_enum_1 = require("../../enums/entity.enum");
const accepted_props_pipe_1 = require("../../pipes/accepted-props.pipe");
const required_props_pipe_1 = require("../../pipes/required-props.pipe");
const transform_query_pipe_1 = require("../../pipes/transform-query.pipe");
const carnet_repository_1 = require("./carnet.repository");
let CarnetController = class CarnetController {
    constructor(carnetRepository) {
        this.carnetRepository = carnetRepository;
    }
    getList(query) {
        return this.carnetRepository.getList(query);
    }
    getListUnAuth(query) {
        return this.carnetRepository.getListUnAuth(query);
    }
    getOne(id) {
        return this.carnetRepository.getOne(id);
    }
    create(data) {
        return this.carnetRepository.create(data);
    }
    update(id, data) {
        return this.carnetRepository.update(id, data);
    }
    delete(id) {
        return this.carnetRepository.delete(id);
    }
};
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Post('/getList'),
    common_1.UsePipes(new transform_query_pipe_1.TransformQuery()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_query_dto_1.MongoQuery]),
    __metadata("design:returntype", Object)
], CarnetController.prototype, "getList", null);
__decorate([
    common_1.Post('/getListUnAuth'),
    common_1.UsePipes(new transform_query_pipe_1.TransformQuery()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_query_dto_1.MongoQuery]),
    __metadata("design:returntype", Object)
], CarnetController.prototype, "getListUnAuth", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Get('/getOne/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getOne", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Post('/create'),
    common_1.UsePipes(new required_props_pipe_1.RequiredProps(entity_enum_1.ENTITY.CARNET)),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [carnet_dto_1.Carnet]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "create", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Put('/update/:id'),
    common_1.UsePipes(new accepted_props_pipe_1.AcceptedProps(entity_enum_1.ENTITY.CARNET)),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "update", null);
__decorate([
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "delete", null);
CarnetController = __decorate([
    common_1.Controller(entity_enum_1.ENTITY.CARNET),
    __metadata("design:paramtypes", [carnet_repository_1.CarnetRepository])
], CarnetController);
exports.CarnetController = CarnetController;
//# sourceMappingURL=carnet.controller.js.map