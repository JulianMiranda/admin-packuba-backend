import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Price } from '../../dto/price.dto';
import { MongoQuery } from '../../dto/mongo-query.dto';
import { ENTITY } from '../../enums/entity.enum';
import { NotificationsRepository } from '../notifications/notifications.repository';

@Injectable()
export class PriceRepository {
  readonly type = ENTITY.PRICE;

  constructor(
    @InjectModel('Price') private priceDb: Model<Price>,
    private notificationsRepository: NotificationsRepository,
  ) {}

  async getPrices(): Promise<any> {
    try {
      const prices = await this.priceDb.find();

      return { prices: prices[0] };
    } catch (e) {
      throw new InternalServerErrorException('Filter prices Database error', e);
    }
  }

  async update(data: Partial<Price>): Promise<boolean> {
    try {
      const document = await this.priceDb.find();
      await this.priceDb.findOneAndUpdate(
        { _id: document[0]._id },
        { ...data },
        { new: true },
      );

      if (!document)
        throw new NotFoundException(`Could not find price to update`);
      const newPrices = await this.priceDb.find();
      this.notificationsRepository.updateEnvio(newPrices[0]);

      return !!document;
    } catch (e) {
      if (e.status === 404) throw e;
      throw new InternalServerErrorException('updatePrice Database error', e);
    }
  }
}
