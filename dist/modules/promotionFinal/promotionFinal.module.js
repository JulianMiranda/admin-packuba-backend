"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionFinalModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const image_module_1 = require("../image/image.module");
const promotionFinal_controller_1 = require("./promotionFinal.controller");
const promotionFinal_repository_1 = require("./promotionFinal.repository");
const promotionFinal_schema_1 = require("../../schemas/promotionFinal.schema");
let PromotionFinalModule = class PromotionFinalModule {
};
PromotionFinalModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'PromotionFinal',
                    schema: promotionFinal_schema_1.PromotionFinalSchema,
                },
            ]),
            image_module_1.ImageModule,
        ],
        providers: [promotionFinal_repository_1.PromotionFinalRepository],
        controllers: [promotionFinal_controller_1.PromotionFinalController],
    })
], PromotionFinalModule);
exports.PromotionFinalModule = PromotionFinalModule;
//# sourceMappingURL=promotionFinal.module.js.map