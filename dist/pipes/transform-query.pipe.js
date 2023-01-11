"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformQuery = void 0;
const common_1 = require("@nestjs/common");
const mongo_query_dto_1 = require("../dto/mongo-query.dto");
const operators_enum_1 = require("../enums/operators.enum");
let TransformQuery = class TransformQuery {
    async transform(value, metadata) {
        return this.transformQuery(value);
    }
    transformQuery(value) {
        if (!value.getAll) {
            const filter = this.transformFilter(value.filter, value.search);
            const projection = this.transformProjection(value.fields);
            const sort = this.transformSort(value.sort);
            const population = this.transformPopulation(value.population);
            const limit = value.docsPerPage || 20;
            const page = value.page || 1;
            const skip = limit * (page - 1);
            return { filter, projection, sort, limit, skip, page, population };
        }
        return {
            filter: {},
            projection: {},
            sort: {},
            limit: 0,
            skip: 0,
            page: 1,
            population: [],
        };
    }
    transformProjection(fields) {
        if (!fields || JSON.stringify(fields) === '{}')
            return {};
        return fields;
    }
    transformSort(sort) {
        if (!sort || JSON.stringify(sort) === '{}')
            return { updatedAt: -1 };
        const response = {};
        for (const key of Object.keys(sort)) {
            if (sort[key] === 'asc' || sort[key] === 'ASC')
                response[key] = 1;
            if (sort[key] === 'desc' || sort[key] === 'DESC')
                response[key] = -1;
        }
        return response;
    }
    transformFilter(filters, search) {
        const filter = {};
        if (filters) {
            for (const key of Object.keys(filters)) {
                const operator = filters[key][0];
                const value = filters[key][1];
                filter[key] = this.getMongoQuery(operator, value);
            }
        }
        if (search &&
            search.text &&
            search.fields &&
            Array.isArray(search.fields) &&
            search.fields.length > 0) {
            filter['$or'] = search.fields.map((field) => {
                const regex = new RegExp(search.text, 'i');
                return { [field]: regex };
            });
        }
        return filter;
    }
    transformPopulation(population) {
        const response = [];
        if (population && Array.isArray(population)) {
            for (const option of [...population]) {
                const res = {};
                if (option.path) {
                    res['path'] = option.path;
                    if (option.filter)
                        res['match'] = option.filter;
                    if (option.fields)
                        res['select'] = option.fields;
                    if (option.populate)
                        res['populate'] = option.populate[0];
                    if (option.options)
                        res['options'] = option.options;
                }
                if (JSON.stringify(res) !== '{}') {
                    response.push(res);
                }
            }
        }
        return response;
    }
    getMongoQuery(operator, value) {
        if (operator === operators_enum_1.OPERATORS.EQUAL)
            return value;
        if (operator === operators_enum_1.OPERATORS.GREAT)
            return { $gt: value };
        if (operator === operators_enum_1.OPERATORS.GREAT_EQUAL)
            return { $gte: value };
        if (operator === operators_enum_1.OPERATORS.LOWER)
            return { $lt: value };
        if (operator === operators_enum_1.OPERATORS.LOWER_EQUAL)
            return { $lte: value };
        if (operator === operators_enum_1.OPERATORS.NOT_EQUAL)
            return { $ne: value };
        if (operator === operators_enum_1.OPERATORS.AND)
            return { $in: value };
        if (operator === operators_enum_1.OPERATORS.NAND)
            return { $nin: value };
        if (operator === operators_enum_1.OPERATORS.EXISTS)
            return { $exists: value };
        throw new common_1.BadRequestException(`Error: '${operator}' is not a valid operator`);
    }
};
TransformQuery = __decorate([
    common_1.Injectable()
], TransformQuery);
exports.TransformQuery = TransformQuery;
//# sourceMappingURL=transform-query.pipe.js.map