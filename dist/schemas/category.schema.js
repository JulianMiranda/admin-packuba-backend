"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
const CategorySchema = new mongoose.Schema({
    name: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    status: { type: Boolean, default: true, index: true },
}, Object.assign({}, index_1.schemaOptions));
exports.default = CategorySchema;
//# sourceMappingURL=category.schema.js.map