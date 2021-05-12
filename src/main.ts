import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions';
import { WrapperInterceptor } from './interceptors';

const port = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new WrapperInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(port);
  console.log(`App is ready on port:${port}`)
}
bootstrap();
