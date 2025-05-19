import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    BadRequestException,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
                    return throwError(() => error);
                }
                // Detecta errores de unicidad de MikroORM
                if (
                    error.name === 'UniqueConstraintViolationException' ||
                    error.code === 'ER_DUP_ENTRY' ||
                    error.message?.includes('duplicate') ||
                    error.message?.includes('UNIQUE')
                ) {
                    return throwError(() => new BadRequestException('Ya existe un registro con ese valor único.'));
                }
                if (
                    error.message?.includes('Data too long') ||
                    error.message?.includes('value too long') ||
                    error.message?.includes('violates')
                ) {
                    return throwError(() => new BadRequestException(error.message));
                }
                console.error('Unhandled error:', error);
                return throwError(() => new BadRequestException(error.message || 'Internal server error'));
            }),
        );
    }
}
