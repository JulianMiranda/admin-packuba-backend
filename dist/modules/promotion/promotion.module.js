"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const image_module_1 = require("../image/image.module");
const promotion_controller_1 = require("./promotion.controller");
const promotion_repository_1 = require("./promotion.repository");
const promotion_schema_1 = require("../../schemas/promotion.schema");
let PromotionModule = class PromotionModule {
};
PromotionModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Promotion',
                    schema: promotion_schema_1.PromotionSchema,
                },
            ]),
            image_module_1.ImageModule,
        ],
        providers: [promotion_repository_1.PromotionRepository],
        controllers: [promotion_controller_1.PromotionController],
    })
], PromotionModule);
exports.PromotionModule = PromotionModule;
//# sourceMappingURL=promotion.module.js.map