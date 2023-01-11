export declare class AWSService {
    private static readonly logger;
    static registerDevice(token: string): Promise<string>;
    static subscribeToSnsTopic(endpointArn: string): Promise<string>;
    static topicARN(token: string, notification: any): Promise<any>;
}
