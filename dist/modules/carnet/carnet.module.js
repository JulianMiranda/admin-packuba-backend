"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarnetModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const carnet_schema_1 = require("../../schemas/carnet.schema");
const carnet_controller_1 = require("./carnet.controller");
const carnet_repository_1 = require("./carnet.repository");
let CarnetModule = class CarnetModule {
};
CarnetModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Carnet',
                    schema: carnet_schema_1.default,
                },
            ]),
        ],
        providers: [carnet_repository_1.CarnetRepository],
        controllers: [carnet_controller_1.CarnetController],
    })
], CarnetModule);
exports.CarnetModule = CarnetModule;
//# sourceMappingURL=carnet.module.js.map