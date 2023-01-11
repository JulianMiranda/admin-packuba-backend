"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const myShop_schema_1 = require("../../schemas/myShop.schema");
const shop_controller_1 = require("./shop.controller");
const shop_repository_1 = require("./shop.repository");
let ShopModule = class ShopModule {
};
ShopModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'MyShop',
                    schema: myShop_schema_1.MyShopSchema,
                },
            ]),
        ],
        providers: [shop_repository_1.ShopRepository],
        controllers: [shop_controller_1.ShopController],
    })
], ShopModule);
exports.ShopModule = ShopModule;
//# sourceMappingURL=shop.module.js.map