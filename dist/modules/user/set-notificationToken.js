"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNotificationToken = void 0;
const mongoose = require("mongoose");
const setNotificationToken = (userId, notificationToken) => [
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
        $notificationTokens: { addToSet: notificationToken },
    },
];
exports.setNotificationToken = setNotificationToken;
//# sourceMappingURL=set-notificationToken.js.map