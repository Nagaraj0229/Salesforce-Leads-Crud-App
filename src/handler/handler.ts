import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { helloValidator } from '../handler/validators/hello.validator';
import { helloService } from 'src/services/hello.service';

export const hello: ValidatedEventAPIGatewayProxyEvent<typeof helloValidator> = async (event) => {
  const data = await helloService(event?.body);
  console.log(data);
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);