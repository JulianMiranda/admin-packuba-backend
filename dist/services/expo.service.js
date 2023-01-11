"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpoService = void 0;
const common_1 = require("@nestjs/common");
const expo_server_sdk_1 = require("expo-server-sdk");
const expo = new expo_server_sdk_1.Expo();
let ExpoService = class ExpoService {
    static init() { }
    static async sendExpoPushNotifications(notificationsArray) {
        const pushTokens = [];
        for (const notification of notificationsArray) {
            pushTokens.push(notification.to);
        }
        for (const pushToken of pushTokens) {
            if (!expo_server_sdk_1.Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }
        }
        const chunks = expo.chunkPushNotifications(notificationsArray);
        const tickets = [];
        (async () => {
            for (const chunk of chunks) {
                try {
                    console.log(chunk);
                    const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk),
                        console.log(`${ticketChunk[0].status} push notifications have been sent`),
                        tickets.push(...ticketChunk);
                }
                catch (error) {
                    console.error(error);
                }
            }
        })();
        const receiptIds = [];
        for (const ticket of tickets) {
            if (ticket.id) {
                receiptIds.push(ticket.id);
            }
        }
        const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
        (async () => {
            for (const chunk of receiptIdChunks) {
                try {
                    const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                    for (const receiptId in receipts) {
                        const { status, details } = receipts[receiptId];
                        if (status === 'ok') {
                            continue;
                        }
                        else if (status === 'error') {
                            console.error(`There was an error sending a notification`);
                            if (details) {
                                console.error(`The error code is ${details}`);
                            }
                        }
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        })();
    }
};
ExpoService = __decorate([
    common_1.Injectable()
], ExpoService);
exports.ExpoService = ExpoService;
//# sourceMappingURL=expo.service.js.map