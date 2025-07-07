import expressZodValidate from 'express-zod-safe';
import type { Request, Response } from 'express';
import type { ZodError } from 'zod';
import { HttpError } from './error';

export type RequestValidatorLogFn = (
    req: Request,
    res: Response,
    err: unknown,
) => void;

interface ErrorListItem {
    type: 'query' | 'params' | 'body';
    errors: ZodError<any>;
}

const errorHandler = (errors: ErrorListItem[], req: unknown, res: unknown, next: any): void => {
    const mappedErrors = errors.map(({ type, errors }) => ({
        type,
        errors: errors.issues,
    }));

    const err = new HttpError(
        'Failed to validate request',
        400,
        mappedErrors,
    );

    next(err);
};

export const requestValidator = (options: object) => expressZodValidate({ ...options, handler: errorHandler });
