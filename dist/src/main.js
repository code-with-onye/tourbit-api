"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const fullAccessOrigins = ['http://localhost:3000'];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }
            if (fullAccessOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(null, false);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.use((req, res, next) => {
        const requestMethod = req.method;
        const origin = req.headers.origin;
        if (!origin) {
            return next();
        }
        if (!fullAccessOrigins.includes(origin) &&
            !['GET', 'PUT', 'OPTIONS'].includes(requestMethod)) {
            return res.status(405).json({ message: 'Method not allowed' });
        }
        next();
    });
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map