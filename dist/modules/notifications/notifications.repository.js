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
exports.NotificationsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subcategory_dto_1 = require("../../dto/subcategory.dto");
const util_1 = require("../../utils/util");
const aws_service_1 = require("../../services/aws.service");
let NotificationsRepository = class NotificationsRepository {
    constructor(notificationDb, usersDb, orderDb) {
        this.notificationDb = notificationDb;
        this.usersDb = usersDb;
        this.orderDb = orderDb;
    }
    async createdProduct(subcategory) {
        const usersJUN = await this.usersDb
            .find({
            $expr: {
                $and: [
                    { $eq: ['$status', true] },
                    { $eq: ['$reciveNotifications', true] },
                ],
            },
        }, { notificationTokens: 1 })
            .lean();
        const notificationsArray = [];
        for (const user of usersJUN) {
            notificationsArray.push({
                user: user._id,
                title: 'Para ti 💙',
                body: `${subcategory.name} disponible en la tienda 🛒`,
                identifier: user._id,
                data: {
                    subcategory: subcategory._id.toString(),
                    click_action: 'SUBCATEGORY_NOTIFICATION_CLICK',
                },
                notificationTokens: user.notificationTokens,
            });
        }
        const pushNotifications = notificationsArray.map((item) => {
            const { title, body, user, data } = item;
            return item.notificationTokens.map((token) => ({
                notification: {
                    title,
                    body,
                    data,
                },
                token,
                user,
            }));
        });
        console.log(util_1.flatten(pushNotifications));
        for (const batch of util_1.flatten(pushNotifications)) {
            console.log('batch', batch);
            aws_service_1.AWSService.topicARN(batch.token, batch.notification);
        }
    }
    async subcategoryDiscount(document) {
        const usersJUN = await this.usersDb
            .find({
            $expr: {
                $and: [
                    { $eq: ['$status', true] },
                    { $eq: ['$reciveNotifications', true] },
                ],
            },
        }, { notificationTokens: 1 })
            .lean();
        const notificationsArray = [];
        const discount = document.priceGaloreDiscount && document.priceGaloreDiscount !== 0
            ? (100 * (document.priceGalore - document.priceGaloreDiscount)) /
                document.priceGalore
            : (100 * (document.price - document.priceDiscount)) / document.price;
        for (const user of usersJUN) {
            notificationsArray.push({
                user: user._id,
                title: `${document.name} en Rebaja!! `,
                body: ` ☝ Cómpralo con ${discount.toFixed(0)}% de descuento`,
                data: {
                    subcategory: document._id.toString(),
                    click_action: 'SUBCATEGORY_NOTIFICATION_CLICK',
                },
                identifier: user._id,
                notificationTokens: user.notificationTokens,
            });
        }
        const pushNotifications = notificationsArray.map((item) => {
            const { title, body, data, user } = item;
            return item.notificationTokens.map((token) => ({
                notification: {
                    title,
                    body,
                    data,
                },
                token,
                user,
            }));
        });
        for (const batch of util_1.flatten(pushNotifications)) {
            console.log('batch', batch);
            aws_service_1.AWSService.topicARN(batch.token, batch.notification);
        }
    }
    async newOrder(type, order) {
        try {
            console.log('Haciendo');
            const orderDB = await this.orderDb
                .findOne({ _id: order }, { cost: 1 })
                .lean();
            const usersJUN = await this.usersDb
                .find({ role: 'JUN' }, { notificationTokens: 1 })
                .lean();
            if (usersJUN.length === 0)
                return;
            const notificationsArray = [];
            for (const user of usersJUN) {
                notificationsArray.push({
                    user: user._id,
                    title: 'Nueva Orden',
                    body: `Nueva orden de ${user.phone} $`,
                    type,
                    identifier: orderDB._id,
                    notificationTokens: user.notificationTokens,
                });
            }
            const pushNotifications = notificationsArray.map((item) => {
                const { title, email, user, body } = item;
                return item.notificationTokens.map((token) => ({
                    notification: {
                        title,
                        body,
                    },
                    token,
                }));
            });
            for (const batch of util_1.flatten(pushNotifications)) {
                console.log('batch', batch);
                aws_service_1.AWSService.topicARN(batch.token, batch.notification);
            }
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('create notification Database error', e);
        }
    }
    async updateEnvio(precios) {
        const usersJUN = await this.usersDb
            .find({
            $expr: {
                $and: [
                    { $eq: ['$status', true] },
                    { $eq: ['$reciveNotifications', true] },
                ],
            },
        }, { notificationTokens: 1 })
            .lean();
        const notificationsArray = [];
        for (const user of usersJUN) {
            notificationsArray.push({
                user: user._id,
                title: 'Nuevos precios de envío 🛫',
                body: `Envía tus compras desde ${precios.oneandhalfkgPrice} $`,
                data: {
                    click_action: 'UPDATE_ENVIO_NOTIFICATION_CLICK',
                },
                identifier: user._id,
                notificationTokens: user.notificationTokens,
            });
        }
        const pushNotifications = notificationsArray.map((item) => {
            const { title, body, user, data } = item;
            return item.notificationTokens.map((token) => ({
                notification: {
                    title,
                    body,
                    data,
                },
                token,
                user,
            }));
        });
        console.log(util_1.flatten(pushNotifications));
        for (const batch of util_1.flatten(pushNotifications)) {
            aws_service_1.AWSService.topicARN(batch.token, batch.notification);
        }
    }
    async finishSoldOut(document) {
        const usersJUN = await this.usersDb
            .find({
            $expr: {
                $and: [
                    { $eq: ['$status', true] },
                    { $eq: ['$reciveNotifications', true] },
                ],
            },
        }, { notificationTokens: 1 })
            .lean();
        const notificationsArray = [];
        for (const user of usersJUN) {
            notificationsArray.push({
                user: user._id,
                title: `${document.name} otra vez disponible `,
                body: `🏃 Añádelo desde ya en tus compras`,
                data: {
                    subcategory: document._id.toString(),
                    click_action: 'SUBCATEGORY_NOTIFICATION_CLICK',
                },
                identifier: user._id,
                notificationTokens: user.notificationTokens,
            });
        }
        const pushNotifications = notificationsArray.map((item) => {
            const { title, body, data, user } = item;
            return item.notificationTokens.map((token) => ({
                notification: {
                    title,
                    body,
                    data,
                },
                token,
                user,
            }));
        });
        for (const batch of util_1.flatten(pushNotifications)) {
            console.log('batch', batch);
            aws_service_1.AWSService.topicARN(batch.token, batch.notification);
        }
    }
};
NotificationsRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Notification')),
    __param(1, mongoose_1.InjectModel('User')),
    __param(2, mongoose_1.InjectModel('Order')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], NotificationsRepository);
exports.NotificationsRepository = NotificationsRepository;
//# sourceMappingURL=notifications.repository.js.map