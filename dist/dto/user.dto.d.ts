import { Document } from 'mongoose';
export declare class User extends Document {
    firebaseId: string;
    online: boolean;
    reciveNotifications: boolean;
    name: string;
    email: string;
    image: string;
    serviceZone: string;
    phone: string;
    role: string;
    permissions: string[];
    defaultImage: string;
    newFavorite: string;
    removeFavorite: string;
    notificationTokens: string;
    theme: string;
}
