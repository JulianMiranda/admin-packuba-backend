"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AWSService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config/config");
const AWS = require("aws-sdk");
let AWSService = AWSService_1 = class AWSService {
    static async registerDevice(token) {
        console.log('Registering device endpoint');
        const sns = new AWS.SNS({
            apiVersion: config_1.AWS_API_VERSION,
            accessKeyId: config_1.AWS_ACCESS_KEY_ID,
            secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
            region: config_1.AWS_REGION,
        });
        const endpointArn = await sns
            .createPlatformEndpoint({
            PlatformApplicationArn: config_1.AWS_ARN,
            Token: token,
        })
            .promise()
            .then((data) => {
            return data.EndpointArn;
        })
            .catch((error) => {
            return null;
        });
        return endpointArn;
    }
    static async subscribeToSnsTopic(endpointArn) {
        console.log('Subscribing device endpoint to topic');
        const sns = new AWS.SNS({
            apiVersion: config_1.AWS_API_VERSION,
            accessKeyId: config_1.AWS_ACCESS_KEY_ID,
            secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
            region: config_1.AWS_REGION,
        });
        const subscriptionArn = await sns
            .subscribe({
            TopicArn: 'Topic_ARN',
            Endpoint: endpointArn,
            Protocol: 'application',
        })
            .promise()
            .then((data) => {
            return data.SubscriptionArn;
        })
            .catch((error) => {
            return null;
        });
        return subscriptionArn;
    }
    static async topicARN(token, notification) {
        const { title, body, data } = notification;
        console.log('Not', title, body);
        const sns = new AWS.SNS({
            apiVersion: config_1.AWS_API_VERSION,
            accessKeyId: config_1.AWS_ACCESS_KEY_ID,
            secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
            region: config_1.AWS_REGION,
        });
        const resp = await AWSService_1.registerDevice(token);
        const message = {
            GCM: '{"notification": { "title":"' +
                title +
                '", "body":' +
                JSON.stringify(body) +
                '}, "data":' +
                JSON.stringify(data) +
                '}',
        };
        console.log(message);
        const params = {
            TargetArn: resp,
            MessageStructure: 'json',
            Message: JSON.stringify(message),
        };
        sns
            .publish(params)
            .promise()
            .then((data) => {
            console.log('MessageID is ' + data.MessageId);
        })
            .catch((err) => {
            console.error(err, err.stack);
        });
    }
};
AWSService.logger = new common_1.Logger('AWS');
AWSService = AWSService_1 = __decorate([
    common_1.Injectable()
], AWSService);
exports.AWSService = AWSService;
//# sourceMappingURL=aws.service.js.map