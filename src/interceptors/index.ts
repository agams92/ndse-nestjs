import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class WrapperInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    console.log('Boba');
    return next.handle().pipe(
      map((data) => ({ status: 'success', data })),
      catchError((err) => {
        console.log(err.message)
        return throwError(new InternalServerErrorException({status: 'fail', data: err}))
      })
    );
  }
}
