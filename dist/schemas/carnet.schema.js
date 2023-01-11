"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../utils/index");
const CarnetSchema = new mongoose.Schema({
    name: String,
    firstLastName: String,
    secondLastName: String,
    carnet: String,
    address: String,
    deparment: String,
    floor: String,
    number: String,
    firstAccross: String,
    secondAccross: String,
    reparto: String,
    municipio: String,
    provincia: String,
    phoneNumber: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean, default: true, index: true },
}, Object.assign({}, index_1.schemaOptions));
exports.default = CarnetSchema;
//# sourceMappingURL=carnet.schema.js.map