"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notification_schema_1 = require("../../schemas/notification.schema");
const order_schema_1 = require("../../schemas/order.schema");
const user_schema_1 = require("../../schemas/user.schema");
const notifications_controller_1 = require("./notifications.controller");
const notifications_repository_1 = require("./notifications.repository");
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Notification',
                    schema: notification_schema_1.NotificationSchema,
                },
                {
                    name: 'User',
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: 'Order',
                    schema: order_schema_1.OrderSchema,
                },
            ]),
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_repository_1.NotificationsRepository],
        exports: [notifications_repository_1.NotificationsRepository],
    })
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map