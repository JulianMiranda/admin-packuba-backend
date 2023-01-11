export declare class FirebaseService {
    private static readonly logger;
    static init(): void;
    static get getAdmin(): any;
    static setClaims(id: string, claims: object): void;
    static deleteUser(id: string): void;
    static sendPushNotifications(notificationsArray: any[]): Promise<void>;
}
