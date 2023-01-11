"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const theme_enum_1 = require("../enums/theme.enum");
const index_1 = require("../utils/index");
exports.UserSchema = new mongoose.Schema({
    firebaseId: String,
    name: { type: String, index: true },
    email: String,
    phone: String,
    role: String,
    defaultImage: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    status: { type: Boolean, default: true, index: true },
    reciveNotifications: { type: Boolean, default: true, index: true },
    authorized: { type: Boolean, default: false, index: true },
    preferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    favoriteOwners: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Owners', index: true },
    ],
    notificationTokens: [{ type: String }],
    online: { type: Boolean, default: false, index: true },
    serviceZone: String,
    theme: {
        type: String,
        default: theme_enum_1.THEME.DEFAULT,
        enum: [theme_enum_1.THEME.DEFAULT, theme_enum_1.THEME.DARK, theme_enum_1.THEME.LIGHT],
    },
}, Object.assign({}, index_1.schemaOptions));
//# sourceMappingURL=user.schema.js.map