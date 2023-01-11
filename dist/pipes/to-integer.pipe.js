"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToIntegerPipe = void 0;
const common_1 = require("@nestjs/common");
class ToIntegerPipe {
    transform(value, metadata) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new common_1.BadRequestException(`Conversion to number failed ${value}`);
        }
        return val;
    }
}
exports.ToIntegerPipe = ToIntegerPipe;
//# sourceMappingURL=to-integer.pipe.js.map