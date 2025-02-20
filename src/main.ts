import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const fullAccessOrigins = [
    'http://localhost:3001',
    'https://tourbit-jrki.vercel.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman)
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

  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestMethod = req.method;
    const origin = req.headers.origin;

    // Allow requests with no origin (like Postman)
    if (!origin) {
      return next();
    }

    // If origin is in fullAccessOrigins, allow all methods
    if (fullAccessOrigins.includes(origin)) {
      return next();
    }

    // For other origins, restrict methods
    if (!['GET', 'PUT', 'OPTIONS'].includes(requestMethod)) {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    next();
  });

  await app.listen(3000);
}
bootstrap();
