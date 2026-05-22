import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { toApiResponse } from '../utils/api-response.util';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ReturnType<typeof toApiResponse<T>>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ReturnType<typeof toApiResponse<T>>> {
    const response = context.switchToHttp().getResponse<{ statusCode: number }>();

    return next.handle().pipe(
      map((data) => toApiResponse(data, response.statusCode)),
    );
  }
}
