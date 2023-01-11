"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet = require("helmet");
const app_module_1 = require("./app.module");
const config_1 = require("./config/config");
const fallback_filter_1 = require("./filters/fallback.filter");
const http_filter_1 = require("./filters/http.filter");
const validation_exception_1 = require("./filters/validation.exception");
const validation_filter_1 = require("./filters/validation.filter");
const firebase_service_1 = require("./services/firebase.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(helmet());
    await app.listen(config_1.PORT);
    console.log('Web Server Packuba listening on port: ', config_1.PORT);
    console.log('Database Server connection string: ', config_1.MONGO_CONNECTION);
    firebase_service_1.FirebaseService.init();
    console.log('Firebase connection with config file: ', config_1.GOOGLE_APPLICATION_CREDENTIALS);
    console.log('Web Server Packuba has been succesfully started');
    app.useGlobalFilters(new fallback_filter_1.FallbackExceptionFilter(), new http_filter_1.HttpExceptionFilter(), new validation_filter_1.ValidationFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors) => {
            const messages = errors.map((error) => `${error.property} has wrong value ${error.value},
                ${Object.values(error.constraints).join(', ')} `);
            return new validation_exception_1.ValidationException(messages);
        },
    }));
}
bootstrap();
//# sourceMappingURL=main.js.map