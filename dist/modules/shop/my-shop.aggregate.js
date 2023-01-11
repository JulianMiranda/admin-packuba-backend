"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myShop = void 0;
const mongoose = require("mongoose");
const myShop = (userId) => [
    { $match: { user: mongoose.Types.ObjectId(userId) } },
];
exports.myShop = myShop;
//# sourceMappingURL=my-shop.aggregate.js.map