"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const subcategory_schema_1 = require("../../schemas/subcategory.schema");
const image_module_1 = require("../image/image.module");
const subcategory_controller_1 = require("./subcategory.controller");
const subcategory_repository_1 = require("./subcategory.repository");
const aws_service_1 = require("../../services/aws.service");
const notifications_module_1 = require("../notifications/notifications.module");
let SubcategoryModule = class SubcategoryModule {
};
SubcategoryModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Subcategory',
                    schema: subcategory_schema_1.default,
                },
            ]),
            image_module_1.ImageModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [subcategory_controller_1.SubcategoryController],
        providers: [subcategory_repository_1.SubcategoryRepository, aws_service_1.AWSService],
    })
], SubcategoryModule);
exports.SubcategoryModule = SubcategoryModule;
//# sourceMappingURL=subcategory.module.js.map