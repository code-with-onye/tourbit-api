import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const fullAccessOrigins = ['http://localhost:3000'];

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestMethod = req.method;
    const origin = req.headers.origin;

    if (
      !fullAccessOrigins.includes(origin) &&
      !['GET', 'PUT', 'OPTIONS'].includes(requestMethod)
    ) {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    next();
  });

  await app.listen(5000);
}
bootstrap();
