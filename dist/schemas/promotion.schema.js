"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionSchema = void 0;
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
exports.PromotionSchema = new mongoose.Schema({
    status: { type: Boolean, default: true, index: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    owner: { type: String, default: 'ENCARGA' },
}, Object.assign({}, index_1.schemaOptions));
//# sourceMappingURL=promotion.schema.js.map