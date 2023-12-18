import { helloValidator } from '../handler/validators/hello.validator';
import { handlerPath } from '@libs/handler-resolver';

export const hello = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schemas: {
            'application/json': helloValidator,
          },
        },
      },
    },
  ],
};
