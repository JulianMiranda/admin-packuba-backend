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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const my_shop_dto_1 = require("../../dto/my-shop.dto");
const order_dto_1 = require("../../dto/order.dto");
const notification_enum_1 = require("../../enums/notification.enum");
const entity_enum_1 = require("../../enums/entity.enum");
const notifications_repository_1 = require("../notifications/notifications.repository");
const sendgrid_service_1 = require("../../services/sendgrid.service");
let OrderRepository = class OrderRepository {
    constructor(orderDb, shopDb, userDb, notificationsRepository) {
        this.orderDb = orderDb;
        this.shopDb = shopDb;
        this.userDb = userDb;
        this.notificationsRepository = notificationsRepository;
        this.type = entity_enum_1.ENTITY.ORDER;
    }
    async getList(query) {
        try {
            const { filter, projection, sort, limit, skip, page, population } = query;
            const [count, order] = await Promise.all([
                this.orderDb.countDocuments(filter),
                this.orderDb
                    .find(filter, projection)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
                    .populate(population),
            ]);
            const totalPages = limit !== 0 ? Math.floor(count / limit) : 1;
            return { count, page, totalPages, data: order };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Filter order Database error', e);
        }
    }
    async getOne(id) {
        try {
            const document = await this.orderDb.findOne({ _id: id }).populate([
                {
                    path: 'selectedCarnet',
                    select: {
                        name: true,
                        firstLastName: true,
                        secondLastName: true,
                        carnet: true,
                        address: true,
                        deparment: true,
                        floor: true,
                        number: true,
                        firstAccross: true,
                        secondAccross: true,
                        reparto: true,
                        municipio: true,
                        provincia: true,
                        phoneNumber: true,
                        status: true,
                    },
                    options: { sort: { updatedAt: 1 } },
                },
                {
                    path: 'user',
                    select: { name: true, phone: true },
                },
            ]);
            if (!document)
                throw new common_1.NotFoundException(`Could not find order for id: ${id}`);
            return document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findOrder Database error', e);
        }
    }
    async setOrder(data) {
        try {
            const newOrder = new this.orderDb(data);
            const document = await newOrder.save();
            if (document) {
                const [user, deleteCar] = await Promise.all([
                    this.userDb.findById(data.user, { name: true, email: true }),
                    this.shopDb.findOneAndUpdate({ user: data.user }, { car: [] }),
                ]);
                await this.notificationsRepository.newOrder(notification_enum_1.NOTIFICATION.ORDER, document._id);
                sendgrid_service_1.SendGridService.sendGrid(document, user).catch((err) => console.log(err));
            }
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            else
                throw new common_1.InternalServerErrorException('findOrder Database error', e);
        }
    }
    async create(data) {
        try {
            const newOrder = new this.orderDb(data);
            const document = await newOrder.save();
            return !!document;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('createOrder Database error', e);
        }
    }
    async update(id, data) {
        try {
            const document = await this.orderDb.findOneAndUpdate({ _id: id }, Object.assign({}, data));
            if (!document)
                throw new common_1.NotFoundException(`Could not find order to update for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('updateOrder Database error', e);
        }
    }
    async delete(id) {
        try {
            const document = await this.orderDb.findOneAndUpdate({ _id: id }, { status: false });
            if (!document)
                throw new common_1.NotFoundException(`Could not find order to delete for id: ${id}`);
            return !!document;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            throw new common_1.InternalServerErrorException('deleteOrder Database error', e);
        }
    }
};
OrderRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Order')),
    __param(1, mongoose_1.InjectModel('MyShop')),
    __param(2, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notifications_repository_1.NotificationsRepository])
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map