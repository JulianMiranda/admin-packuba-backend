"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirebaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const util_1 = require("../utils/util");
let FirebaseService = FirebaseService_1 = class FirebaseService {
    static init() {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }
    static get getAdmin() {
        return admin;
    }
    static setClaims(id, claims) {
        admin
            .auth()
            .setCustomUserClaims(id, Object.assign({}, claims))
            .then(() => console.log('Successful firebase claims update'))
            .catch((e) => {
            throw new common_1.InternalServerErrorException('Error in firebase claims update', e);
        });
    }
    static deleteUser(id) {
        admin.auth().deleteUser(id);
        this.logger.log(`Delete from Firebase user ${id}`);
    }
    static async sendPushNotifications(notificationsArray) {
        const notificationBatches = util_1.splitArray(notificationsArray, 500);
        for (const batch of notificationBatches) {
            await admin.messaging().sendAll(batch);
        }
        this.logger.log(`${notificationsArray.length} push notifications have been sent`);
    }
};
FirebaseService.logger = new common_1.Logger(FirebaseService_1.name);
FirebaseService = FirebaseService_1 = __decorate([
    common_1.Injectable()
], FirebaseService);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map