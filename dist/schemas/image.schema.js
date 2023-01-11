"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
exports.ImageSchema = new mongoose.Schema({
    url: String,
    blurHash: String,
    parentType: { type: String, index: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, index: true },
    status: { type: Boolean, default: true, index: true },
}, Object.assign({}, index_1.schemaOptions));
//# sourceMappingURL=image.schema.js.map