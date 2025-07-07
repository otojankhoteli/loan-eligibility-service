import type { ErrorRequestHandler } from 'express';

export const defaultErrorHandler: ErrorRequestHandler = (
    err,
    _req,
    res,
    _next,
) => {
    if (!res.headersSent) {
        const {
            httpStatusCode = 500,
            message = 'Internal Server Error',
            errorData,
        } = err;
        res.status(httpStatusCode).json({
            error: {
                message,
                errorData,
            },
        });
    }
};
