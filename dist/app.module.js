"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const config_1 = require("./config/config");
const get_user_middleware_1 = require("./middlewares/get-user.middleware");
const firebase_service_1 = require("./services/firebase.service");
const user_controller_1 = require("./modules/user/user.controller");
const user_module_1 = require("./modules/user/user.module");
const role_controller_1 = require("./modules/role/role.controller");
const role_module_1 = require("./modules/role/role.module");
const image_controller_1 = require("./modules/image/image.controller");
const image_module_1 = require("./modules/image/image.module");
const auth_controller_1 = require("./modules/auth/auth.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const category_module_1 = require("./modules/category/category.module");
const category_controller_1 = require("./modules/category/category.controller");
const subcategory_controller_1 = require("./modules/subcategory/subcategory.controller");
const subcategory_module_1 = require("./modules/subcategory/subcategory.module");
const shop_module_1 = require("./modules/shop/shop.module");
const shop_controller_1 = require("./modules/shop/shop.controller");
const order_module_1 = require("./modules/order/order.module");
const order_controller_1 = require("./modules/order/order.controller");
const expo_service_1 = require("./services/expo.service");
const sendgrid_service_1 = require("./services/sendgrid.service");
const aws_service_1 = require("./services/aws.service");
const promotion_controller_1 = require("./modules/promotion/promotion.controller");
const promotion_module_1 = require("./modules/promotion/promotion.module");
const price_module_1 = require("./modules/price/price.module");
const price_controller_1 = require("./modules/price/price.controller");
const carnet_module_1 = require("./modules/carnet/carnet.module");
const carnet_controller_1 = require("./modules/carnet/carnet.controller");
const promotionFinal_module_1 = require("./modules/promotionFinal/promotionFinal.module");
const promotionFinal_controller_1 = require("./modules/promotionFinal/promotionFinal.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(get_user_middleware_1.GetUserMiddleware)
            .forRoutes(auth_controller_1.AuthController, user_controller_1.UserController, role_controller_1.RoleController, image_controller_1.ImageController, category_controller_1.CategoryController, subcategory_controller_1.SubcategoryController, shop_controller_1.ShopController, order_controller_1.OrderController, promotion_controller_1.PromotionController, promotionFinal_controller_1.PromotionFinalController, price_controller_1.PriceController, carnet_controller_1.CarnetController);
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(config_1.MONGO_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            image_module_1.ImageModule,
            category_module_1.CategoryModule,
            subcategory_module_1.SubcategoryModule,
            shop_module_1.ShopModule,
            order_module_1.OrderModule,
            promotion_module_1.PromotionModule,
            promotionFinal_module_1.PromotionFinalModule,
            price_module_1.PriceModule,
            carnet_module_1.CarnetModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [firebase_service_1.FirebaseService, expo_service_1.ExpoService, sendgrid_service_1.SendGridService, aws_service_1.AWSService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map