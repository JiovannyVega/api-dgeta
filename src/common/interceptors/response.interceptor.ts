import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorResponse } from '../responses/response.class';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                message: 'Request successful',
                data,
            })),
            catchError((error) => {
                if (error instanceof HttpException) {
                    const response = new ErrorResponse(error.message, error.getResponse());
                    return new Observable((observer) => {
                        observer.next(response); // Devolver la respuesta estructurada
                        observer.complete();
                    });
                }
                console.error('Unhandled error:', error); // Registrar el error en la consola
                const response = new ErrorResponse('Internal server error', error.message);
                return new Observable((observer) => {
                    observer.next(response); // Devolver la respuesta estructurada
                    observer.complete();
                });
            }),
        );
    }
}
