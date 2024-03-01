import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

const doc = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Room booking API')
  .setVersion('1.0');

doc.addServer('http://localhost:3000', 'locale');

export const swaggerConfig = doc.build();

export const swaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
};
