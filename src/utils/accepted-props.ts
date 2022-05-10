import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MyShop } from 'src/dto/my-shop.dto';
import { Category } from '../dto/category.dto';
import { Subcategory } from '../dto/subcategory.dto';
import { User } from '../dto/user.dto';
import { ENTITY } from '../enums/entity.enum';
import { THEME } from '../enums/theme.enum';
import { Order } from '../dto/order.dto';
import { Promotion } from 'src/dto/promotion.dto';
import { Price } from '../dto/price.dto';

const checkProps = (props: string[], dataKeys: string[]) => {
  for (const key of dataKeys) {
    if (!props.includes(key)) {
      throw new BadRequestException(`The property \\ ${key} \\ is not valid`);
    }
  }
};

const checkUsersProps = (data: Partial<User>): Partial<User> => {
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
  ];
  const { role, theme } = data;
  if (role && !['ADMIN', 'JUN', 'CUN'].includes(role))
    throw new BadRequestException('\\ role \\ must be ADMIN, JUN or CUN ');

  if (theme && !['DEFAULT', 'DARK', 'LIGHT'].includes(theme))
    throw new BadRequestException('\\ theme \\ must be DEFAULT, DARK, LIGHT ');

  checkProps(props, Object.keys(data));
  return data;
};

const checkCategoriesProps = (data: Partial<Category>): Partial<Category> => {
  const props = ['name', 'status', 'image'];
  checkProps(props, Object.keys(data));
  return data;
};

const checkSubcategoriesProps = (
  data: Partial<Subcategory>,
): Partial<Subcategory> => {
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
  ];
  checkProps(props, Object.keys(data));
  return data;
};
const checkShopProps = (data: Partial<MyShop>): Partial<MyShop> => {
  const props = ['car'];
  checkProps(props, Object.keys(data));
  return data;
};

const checkOrderProps = (data: Partial<Order>): Partial<Order> => {
  const props = ['car', 'status'];
  checkProps(props, Object.keys(data));
  return data;
};

const checkPromotionProps = (data: Partial<Promotion>): Partial<Promotion> => {
  const props = ['image', 'status'];
  checkProps(props, Object.keys(data));
  return data;
};
const checkPriceProps = (data: Partial<Price>): Partial<Price> => {
  const props = [
    'mlc',
    'mn',
    'oneandhalfkgPrice',
    'twokgPrice',
    'threekgPrice',
    'fourkgPrice',
    'fivekgPrice',
    'sixkgPrice',
    'sevenkgPrice',
    'eigthkgPrice',
    'ninekgPrice',
    'tenkgPrice',
  ];
  checkProps(props, Object.keys(data));
  return data;
};
export const acceptedProps = (route: string, data: any): any => {
  if (route === ENTITY.USERS) return checkUsersProps(data);
  else if (route === ENTITY.CATEGORY) return checkCategoriesProps(data);
  else if (route === ENTITY.SUBCATEGORY) return checkSubcategoriesProps(data);
  else if (route === ENTITY.MYSHOP) return checkShopProps(data);
  else if (route === ENTITY.ORDER) return checkOrderProps(data);
  else if (route === ENTITY.PROMOTION) return checkPromotionProps(data);
  else if (route === ENTITY.PRICE) return checkPriceProps(data);
  throw new InternalServerErrorException('Invalid Route');
};
