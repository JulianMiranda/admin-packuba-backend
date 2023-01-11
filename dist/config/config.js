"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_ARN = exports.AWS_REGION = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = exports.AWS_API_VERSION = exports.SENDGRID_TEMPL_ID = exports.SENDGRID_API_KEY = exports.MAPBOX_API_KEY = exports.DEFAULT_API_WELCOME_MESSAGE = exports.GOOGLE_APPLICATION_CREDENTIALS = exports.Alp = exports.MONGO_CONNECTION = exports.PORT = void 0;
exports.PORT = process.env.PORT || 5001;
exports.MONGO_CONNECTION = process.env.MONGO_CONNECTION ||
    'mongodb+srv://tyto:5epXXvk0yxBqkk7c@cluster0.9jous.mongodb.net/packuba';
exports.Alp = 'src/utils/parent-cats.json';
process.env.GOOGLE_APPLICATION_CREDENTIALS =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
        'src/config/firebase-key-dev.json';
exports.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
exports.DEFAULT_API_WELCOME_MESSAGE = process.env.DEFAULT_API_WELCOME_MESSAGE || 'Hiya!';
exports.MAPBOX_API_KEY = process.env.MAPBOX_API_KEY ||
    'pk.eyJ1IjoianVsaWFubWlyYW5kYXdheXUyIiwiYSI6ImNrYWgyMG1jNTAyb2wyd3FlMTl5dXN0cnoifQ.amDhY-A087EYgGpYiycrSA';
exports.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
exports.SENDGRID_TEMPL_ID = process.env.SENDGRID_TEMPL_ID || '';
exports.AWS_API_VERSION = process.env.AWS_API_VERSION || '';
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
exports.AWS_REGION = process.env.AWS_REGION || '';
exports.AWS_ARN = process.env.AWS_ARN ||
    'arn:aws:sns:us-east-1:174491001014:app/GCM/NotificationFirebase';
//# sourceMappingURL=config.js.map