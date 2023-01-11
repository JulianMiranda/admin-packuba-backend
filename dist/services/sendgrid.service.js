"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SendGridService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridService = void 0;
const common_1 = require("@nestjs/common");
const sgMail = require("@sendgrid/mail");
const config_1 = require("../config/config");
let SendGridService = SendGridService_1 = class SendGridService {
    static init() { }
    static async sendGrid(data, user) {
        const { car } = data;
        const dataCar = car.map((item) => {
            const costItem = item.cantidad * item.subcategory.price;
            return { name: item.subcategory.name, cantidad: item.cantidad, costItem };
        });
        const envio = 19.6;
        let total = 0;
        dataCar.forEach(function (item) {
            total += item.costItem;
        });
        sgMail.setApiKey(config_1.SENDGRID_API_KEY);
        const msgToJUN = {
            to: 'jmirandauria@gmail.com',
            from: {
                name: 'Packuba',
                email: 'enviospackuba@gmail.com',
            },
            templateId: config_1.SENDGRID_TEMPL_ID,
            dynamicTemplateData: {
                user: user.name,
                total,
                envio,
                products: dataCar,
            },
        };
        sgMail.send(msgToJUN);
    }
};
SendGridService.logger = new common_1.Logger(SendGridService_1.name);
SendGridService = SendGridService_1 = __decorate([
    common_1.Injectable()
], SendGridService);
exports.SendGridService = SendGridService;
//# sourceMappingURL=sendgrid.service.js.map