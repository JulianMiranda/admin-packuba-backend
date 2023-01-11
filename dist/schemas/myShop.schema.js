"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyShopSchema = void 0;
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
exports.MyShopSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    car: [],
}, Object.assign({}, index_1.schemaOptions));
//# sourceMappingURL=myShop.schema.js.map