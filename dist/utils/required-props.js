"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredProps = void 0;
const common_1 = require("@nestjs/common");
const my_shop_dto_1 = require("../dto/my-shop.dto");
const subcategory_dto_1 = require("../dto/subcategory.dto");
const entity_enum_1 = require("../enums/entity.enum");
const promotion_dto_1 = require("../dto/promotion.dto");
const carnet_dto_1 = require("../dto/carnet.dto");
const promotionFinal_dto_1 = require("../dto/promotionFinal.dto");
const prepareProps = (props, data) => {
    for (const key of Object.keys(data)) {
        if (!props.includes(key))
            delete data[key];
    }
    return data;
};
const checkNullOrUndefined = (props, data) => {
    for (const key of props) {
        if (!data.hasOwnProperty(key))
            throw new common_1.BadRequestException(`The property \\ ${key} \\ is required`);
        else if (data[key] == null)
            throw new common_1.BadRequestException(`The property \\ ${key} \\ cannot be null or undefined`);
        else if (data[key] === '')
            throw new common_1.BadRequestException(`The property \\ ${key} \\ cannot be a empty string`);
        else if (data[key] === [])
            throw new common_1.BadRequestException(`The property \\ ${key} \\ cannot be a empty array`);
    }
};
const checkCategoriesProps = (data) => {
    const props = ['name', 'image'];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const checkSubcategoriesProps = (data) => {
    const props = ['name', 'images', 'category'];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const checkShopProps = (data) => {
    const props = ['car'];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const checkOrderProps = (data) => {
    const props = ['car'];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const checkPromotionProps = (data) => {
    const props = ['image'];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const checkPromotionFinalProps = (data) => {
    const props = ['image'];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const checkCarnetProps = (data) => {
    const props = [
        'name',
        'firstLastName',
        'secondLastName',
        'carnet',
        'number',
        'address',
        'municipio',
        'provincia',
        'phoneNumber',
        'user',
    ];
    const dataCopy = prepareProps(props, Object.assign({}, data));
    checkNullOrUndefined(props, dataCopy);
    return data;
};
const requiredProps = (route, data) => {
    if (route === entity_enum_1.ENTITY.CATEGORY)
        return checkCategoriesProps(data);
    if (route === entity_enum_1.ENTITY.SUBCATEGORY)
        return checkSubcategoriesProps(data);
    if (route === entity_enum_1.ENTITY.MYSHOP)
        return checkShopProps(data);
    if (route === entity_enum_1.ENTITY.ORDER)
        return checkOrderProps(data);
    if (route === entity_enum_1.ENTITY.PROMOTION)
        return checkPromotionProps(data);
    if (route === entity_enum_1.ENTITY.PROMOTIONFINAL)
        return checkPromotionFinalProps(data);
    if (route === entity_enum_1.ENTITY.CARNET)
        return checkCarnetProps(data);
    throw new common_1.InternalServerErrorException('Invalid Route');
};
exports.requiredProps = requiredProps;
//# sourceMappingURL=required-props.js.map