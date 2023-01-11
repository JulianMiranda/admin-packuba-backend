"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
exports.OrderSchema = new mongoose.Schema({
    status: { type: Boolean, default: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    car: [],
    cost: Number,
    currency: { type: String, default: 'USD' },
    selectedCarnet: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Carnet', index: true },
    ],
}, Object.assign({}, index_1.schemaOptions));
//# sourceMappingURL=order.schema.js.map