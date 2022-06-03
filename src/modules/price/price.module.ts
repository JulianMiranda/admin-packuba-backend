import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceSchema } from 'src/schemas/price.schema';
import { PriceController } from './price.controller';
import { PriceRepository } from './price.repository';
import { AWSService } from '../../services/aws.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Price',
        schema: PriceSchema,
      },
    ]),
    NotificationsModule,
  ],
  providers: [PriceRepository, AWSService],
  controllers: [PriceController],
})
export class PriceModule {}
