"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose = require("mongoose");
const notification_enum_1 = require("../enums/notification.enum");
exports.NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: String,
    body: String,
    type: {
        type: String,
        enum: [notification_enum_1.NOTIFICATION.ORDER],
    },
    identifier: { type: mongoose.Schema.Types.ObjectId },
}, { timestamps: { createdAt: true, updatedAt: false } });
//# sourceMappingURL=notification.schema.js.map