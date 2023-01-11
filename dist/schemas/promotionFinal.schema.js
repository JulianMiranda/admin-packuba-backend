"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionFinalSchema = void 0;
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
exports.PromotionFinalSchema = new mongoose.Schema({
    status: { type: Boolean, default: true, index: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    owner: { type: String, default: 'ENCARGA' },
}, Object.assign({}, index_1.schemaOptions));
//# sourceMappingURL=promotionFinal.schema.js.map