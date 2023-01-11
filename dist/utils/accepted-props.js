"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptedProps = void 0;
const common_1 = require("@nestjs/common");
const my_shop_dto_1 = require("../dto/my-shop.dto");
const entity_enum_1 = require("../enums/entity.enum");
const promotion_dto_1 = require("../dto/promotion.dto");
const carnet_dto_1 = require("../dto/carnet.dto");
const promotionFinal_dto_1 = require("../dto/promotionFinal.dto");
const checkProps = (props, dataKeys) => {
    for (const key of dataKeys) {
        if (!props.includes(key)) {
            throw new common_1.BadRequestException(`The property \\ ${key} \\ is not valid`);
        }
    }
};
const checkUsersProps = (data) => {
    const props = [
        'name',
        'email',
        'role',
        'image',
        'status',
        'preferences',
        'serviceZone',
        'newFavorite',
        'removeFavorite',
        'notificationTokens',
        'theme',
        'phone',
        'authorized',
        'reciveNotifications',
    ];
    const { role, theme } = data;
    if (role && !['ADMIN', 'JUN', 'CUN'].includes(role))
        throw new common_1.BadRequestException('\\ role \\ must be ADMIN, JUN or CUN ');
    if (theme && !['DEFAULT', 'DARK', 'LIGHT'].includes(theme))
        throw new common_1.BadRequestException('\\ theme \\ must be DEFAULT, DARK, LIGHT ');
    checkProps(props, Object.keys(data));
    return data;
};
const checkCategoriesProps = (data) => {
    const props = ['name', 'status', 'image'];
    checkProps(props, Object.keys(data));
    return data;
};
const checkPromotionFinalProps = (data) => {
    const props = ['image', 'status', 'subcategory', 'owner'];
    checkProps(props, Object.keys(data));
    return data;
};
const checkSubcategoriesProps = (data) => {
    const props = [
        'name',
        'status',
        'images',
        'category',
        'price',
        'priceGalore',
        'priceDiscount',
        'priceGaloreDiscount',
        'currency',
        'deleteImages',
        'weight',
        'description',
        'cost',
        'stock',
        'aviableSizes',
        'aviableColors',
        'soldOut',
    ];
    checkProps(props, Object.keys(data));
    return data;
};
const checkShopProps = (data) => {
    const props = ['car'];
    checkProps(props, Object.keys(data));
    return data;
};
const checkOrderProps = (data) => {
    const props = ['car', 'status'];
    checkProps(props, Object.keys(data));
    return data;
};
const checkPromotionProps = (data) => {
    const props = ['image', 'status', 'owner'];
    checkProps(props, Object.keys(data));
    return data;
};
const checkCarnetProps = (data) => {
    const props = [
        'name',
        'firstLastName',
        'secondLastName',
        'carnet',
        'address',
        'deparment',
        'floor',
        'number',
        'firstAccross',
        'secondAccross',
        'reparto',
        'municipio',
        'provincia',
        'phoneNumber',
        'user',
        'status',
    ];
    checkProps(props, Object.keys(data));
    return data;
};
const checkPriceProps = (data) => {
    const props = [
        'mlc',
        'mn',
        'rate',
        'oneandhalfkgPrice',
        'twokgPrice',
        'threekgPrice',
        'fourkgPrice',
        'fivekgPrice',
        'sixkgPrice',
        'sevenkgPrice',
        'eightkgPrice',
        'eigthkgPrice',
        'ninekgPrice',
        'tenkgPrice',
        'elevenkgPrice',
        'twelvekgPrice',
        'thirteenkgPrice',
        'fourteenkgPrice',
        'fifteenkgPrice',
        'sixteenkgPrice',
        'seventeenkgPrice',
        'eighteenkgPrice',
        'nineteenkgPrice',
        'twentykgPrice',
    ];
    checkProps(props, Object.keys(data));
    return data;
};
const acceptedProps = (route, data) => {
    if (route === entity_enum_1.ENTITY.USERS)
        return checkUsersProps(data);
    else if (route === entity_enum_1.ENTITY.CATEGORY)
        return checkCategoriesProps(data);
    else if (route === entity_enum_1.ENTITY.SUBCATEGORY)
        return checkSubcategoriesProps(data);
    else if (route === entity_enum_1.ENTITY.MYSHOP)
        return checkShopProps(data);
    else if (route === entity_enum_1.ENTITY.ORDER)
        return checkOrderProps(data);
    else if (route === entity_enum_1.ENTITY.PROMOTION)
        return checkPromotionProps(data);
    else if (route === entity_enum_1.ENTITY.PROMOTIONFINAL)
        return checkPromotionFinalProps(data);
    else if (route === entity_enum_1.ENTITY.PRICE)
        return checkPriceProps(data);
    else if (route === entity_enum_1.ENTITY.CARNET)
        return checkCarnetProps(data);
    throw new common_1.InternalServerErrorException('Invalid Route');
};
exports.acceptedProps = acceptedProps;
//# sourceMappingURL=accepted-props.js.map