"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const price_schema_1 = require("../../schemas/price.schema");
const price_controller_1 = require("./price.controller");
const price_repository_1 = require("./price.repository");
const aws_service_1 = require("../../services/aws.service");
const notifications_module_1 = require("../notifications/notifications.module");
let PriceModule = class PriceModule {
};
PriceModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Price',
                    schema: price_schema_1.PriceSchema,
                },
            ]),
            notifications_module_1.NotificationsModule,
        ],
        providers: [price_repository_1.PriceRepository, aws_service_1.AWSService],
        controllers: [price_controller_1.PriceController],
    })
], PriceModule);
exports.PriceModule = PriceModule;
//# sourceMappingURL=price.module.js.map