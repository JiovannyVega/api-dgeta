import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Si ya es BadRequestException, responde con 400
        if (exception instanceof BadRequestException) {
            const res: any = exception.getResponse();
            const message = res.message || 'Solicitud incorrecta';
            response.status(400).json({
                success: false,
                message,
                error: res.message !== message ? res.message : null,
            });
            return;
        }

        // Si es NotFoundException, responde con 404
        if (exception instanceof NotFoundException) {
            const res: any = exception.getResponse();
            const message = res.message || 'No encontrado';
            response.status(404).json({
                success: false,
                message,
                error: res.message !== message ? res.message : null,
            });
            return;
        }

        // Errores de unicidad (MySQL/MariaDB y MikroORM)
        if (
            exception?.name === 'UniqueConstraintViolationException' ||
            exception?.code === 'ER_DUP_ENTRY' ||
            exception?.message?.includes('duplicate') ||
            exception?.message?.includes('UNIQUE')
        ) {
            response.status(400).json({
                success: false,
                message: 'Ya existe un registro con ese valor único.',
                error: null,
            });
            return;
        }

        // Errores de longitud de datos
        if (
            exception?.message?.includes('Data too long') ||
            exception?.message?.includes('value too long')
        ) {
            response.status(400).json({
                success: false,
                message: 'El valor es demasiado largo para uno de los campos.',
                error: exception.message,
            });
            return;
        }

        // Otros errores
        response.status(500).json({
            success: false,
            message: 'Internal server error',
            error: exception.message,
        });
    }
}
