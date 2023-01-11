"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
const SubcategorySchema = new mongoose.Schema({
    name: { type: String, index: true },
    description: [],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: 'Category',
    },
    cost: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    priceGalore: { type: Number, default: 0 },
    priceDiscount: { type: Number, default: 0 },
    priceGaloreDiscount: { type: Number, default: 0 },
    weight: { type: Number, default: 1 },
    stock: { type: Number, default: 0 },
    aviableSizes: [],
    aviableColors: [],
    currency: { type: String, default: 'USD' },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    status: { type: Boolean, default: true, index: true },
    soldOut: { type: Boolean, default: false, index: true },
    recentProduct: { type: Date, default: new Date(), index: true },
}, Object.assign({}, index_1.schemaOptions));
SubcategorySchema.index({ name: 'text' });
exports.default = SubcategorySchema;
//# sourceMappingURL=subcategory.schema.js.map