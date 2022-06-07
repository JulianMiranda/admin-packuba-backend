import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory } from 'src/dto/subcategory.dto';
import { flatten } from 'src/utils/util';
import { Order } from '../../dto/order.dto';
import { User } from '../../dto/user.dto';
import { Price } from '../../dto/price.dto';
import { NOTIFICATION } from '../../enums/notification.enum';
import { AWSService } from '../../services/aws.service';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel('Notification') private notificationDb: Model<any>,
    @InjectModel('User') private usersDb: Model<User>,
    @InjectModel('Order') private orderDb: Model<Order>,
  ) {}

  async createdProduct(subcategory: Subcategory): Promise<any> {
    const usersJUN = await this.usersDb
      .find(
        {
          $expr: {
            $and: [
              { $eq: ['$status', true] },
              { $eq: ['$reciveNotifications', true] },
            ],
          },
        },
        { notificationTokens: 1 },
      )
      .lean();

    const notificationsArray = [];

    for (const user of usersJUN) {
      notificationsArray.push({
        user: user._id,
        title: 'Para ti 💙',
        body: `${subcategory.name} disponible en la tienda 🛒`,
        identifier: user._id,
        data: {
          subcategory: subcategory.toString(),
          click_action: 'SUBCATEGORY_NOTIFICATION_CLICK',
        },
        notificationTokens: user.notificationTokens,
      });
    }

    const pushNotifications = notificationsArray.map((item) => {
      const { title, body, user, data } = item;
      return item.notificationTokens.map((token: string) => ({
        notification: {
          title,
          body,
          data,
        },
        token,
        user,
      }));
    });

    console.log(flatten(pushNotifications));

    for (const batch of flatten(pushNotifications)) {
      console.log('batch', batch);
      AWSService.topicARN(batch.token, batch.notification);

      /* AWSService.topicARN(
        'dnWoy_m_QwO4RynUsRMTqC:APA91bEZIEVb65UhhMYk6OauBJMw_v9MDUPAdovxZ8_gYS6UdgUGaDQTvB5vuXTaDAzkpsSoO-rLwL2bYg4UY-4F-sxUnFUlGvs8k0AFf_S2-HmVpDEvzNHQ3E0r0gW1txX0Yt9tHqQT',
        {
          title: 'Titulo Not',
          body: 'Body de la not',
        },
      ); */
    }
    /* AWSService.topicARN(
      'dnWoy_m_QwO4RynUsRMTqC:APA91bEZIEVb65UhhMYk6OauBJMw_v9MDUPAdovxZ8_gYS6UdgUGaDQTvB5vuXTaDAzkpsSoO-rLwL2bYg4UY-4F-sxUnFUlGvs8k0AFf_S2-HmVpDEvzNHQ3E0r0gW1txX0Yt9tHqQT',
      {
        title: 'Titulo Not',
        body: 'Body de la not',
      },
    ); */
  }

  async subcategoryDiscount(document: Subcategory): Promise<any> {
    const usersJUN = await this.usersDb
      .find(
        {
          $expr: {
            $and: [
              { $eq: ['$status', true] },
              { $eq: ['$reciveNotifications', true] },
            ],
          },
        },
        { notificationTokens: 1 },
      )
      .lean();

    const notificationsArray = [];
    /*   const discount =
    priceGaloreDiscount && priceGaloreDiscount !== 0
      ? (100 * (priceGalore - priceGaloreDiscount)) / priceGalore
      : (100 * (price - priceDiscount)) / price;
 */

    const discount =
      document.priceGaloreDiscount && document.priceGaloreDiscount !== 0
        ? (100 * (document.priceGalore - document.priceGaloreDiscount)) /
          document.priceGalore
        : (100 * (document.price - document.priceDiscount)) / document.price;

    for (const user of usersJUN) {
      notificationsArray.push({
        user: user._id,
        title: `${document.name} en Rebaja!! `,
        body: ` ☝ Cómpralo con ${discount.toFixed(0)}% de descuento`,
        data: {
          subcategory: document.toString(),
          click_action: 'SUBCATEGORY_NOTIFICATION_CLICK',
        },
        identifier: user._id,
        notificationTokens: user.notificationTokens,
      });
    }

    const pushNotifications = notificationsArray.map((item) => {
      const { title, body, data, user } = item;
      return item.notificationTokens.map((token: string) => ({
        notification: {
          title,
          body,
          data,
        },

        token,
        user,
      }));
    });

    for (const batch of flatten(pushNotifications)) {
      console.log('batch', batch);
      AWSService.topicARN(batch.token, batch.notification);
    }
  }

  async newOrder(type: NOTIFICATION, order: string): Promise<any> {
    try {
      console.log('Haciendo');

      const orderDB = await this.orderDb
        .findOne({ _id: order }, { cost: 1 })
        .lean();

      const usersJUN = await this.usersDb
        .find({ role: 'JUN' }, { notificationTokens: 1 })
        .lean();

      if (usersJUN.length === 0) return;

      const notificationsArray = [];

      for (const user of usersJUN) {
        notificationsArray.push({
          user: user._id,
          title: 'Nueva Orden',
          body: `Nueva orden de ${user.phone} $`,
          type,
          identifier: orderDB._id,
          notificationTokens: user.notificationTokens,
        });
      }

      //await this.notificationDb.insertMany(notificationsArray);

      /*  const pushNotifications = notificationsArray.map((item) => {
        const { title, body } = item;
        return item.notificationTokens.map((token: string) => ({
          title,
          body,
          data: {
            source: 'backend',
            type,
          },
          to: token,
        }));
      }); */

      const pushNotifications = notificationsArray.map((item) => {
        const { title, email, user, body } = item;
        return item.notificationTokens.map((token: string) => ({
          notification: {
            title,
            body,
          },

          token,
        }));
      });
      for (const batch of flatten(pushNotifications)) {
        console.log('batch', batch);
        AWSService.topicARN(batch.token, batch.notification);

        /* AWSService.topicARN(
          'dnWoy_m_QwO4RynUsRMTqC:APA91bEZIEVb65UhhMYk6OauBJMw_v9MDUPAdovxZ8_gYS6UdgUGaDQTvB5vuXTaDAzkpsSoO-rLwL2bYg4UY-4F-sxUnFUlGvs8k0AFf_S2-HmVpDEvzNHQ3E0r0gW1txX0Yt9tHqQT',
          {
            title: 'Titulo Not',
            body: 'Body de la not',
          },
        ); */
      }

      //FirebaseService.sendPushNotifications(flatten(pushNotifications));
      // ExpoService.sendExpoPushNotifications(flatten(pushNotifications));
    } catch (e) {
      throw new InternalServerErrorException(
        'create notification Database error',
        e,
      );
    }
  }

  async updateEnvio(precios: Price): Promise<any> {
    const usersJUN = await this.usersDb
      .find(
        {
          $expr: {
            $and: [
              { $eq: ['$status', true] },
              { $eq: ['$reciveNotifications', true] },
            ],
          },
        },
        { notificationTokens: 1 },
      )
      .lean();

    const notificationsArray = [];
    for (const user of usersJUN) {
      notificationsArray.push({
        user: user._id,
        title: 'Nuevos precios de envío 🛫',
        body: `Envía tus compras desde ${precios.oneandhalfkgPrice} $`,
        data: {
          click_action: 'UPDATE_ENVIO_NOTIFICATION_CLICK',
        },
        identifier: user._id,
        notificationTokens: user.notificationTokens,
      });
    }

    const pushNotifications = notificationsArray.map((item) => {
      const { title, body, user, data } = item;
      return item.notificationTokens.map((token: string) => ({
        notification: {
          title,
          body,
          data,
        },

        token,
        user,
      }));
    });

    console.log(flatten(pushNotifications));

    for (const batch of flatten(pushNotifications)) {
      AWSService.topicARN(batch.token, batch.notification);

      /* AWSService.topicARN(
        'dnWoy_m_QwO4RynUsRMTqC:APA91bEZIEVb65UhhMYk6OauBJMw_v9MDUPAdovxZ8_gYS6UdgUGaDQTvB5vuXTaDAzkpsSoO-rLwL2bYg4UY-4F-sxUnFUlGvs8k0AFf_S2-HmVpDEvzNHQ3E0r0gW1txX0Yt9tHqQT',
        {
          title: 'Titulo Not',
          body: 'Body de la not',
        },
      ); */
    }
    /* AWSService.topicARN(
      'dnWoy_m_QwO4RynUsRMTqC:APA91bEZIEVb65UhhMYk6OauBJMw_v9MDUPAdovxZ8_gYS6UdgUGaDQTvB5vuXTaDAzkpsSoO-rLwL2bYg4UY-4F-sxUnFUlGvs8k0AFf_S2-HmVpDEvzNHQ3E0r0gW1txX0Yt9tHqQT',
      {
        title: 'Titulo Not',
        body: 'Body de la not',
      },
    ); */
  }
}
