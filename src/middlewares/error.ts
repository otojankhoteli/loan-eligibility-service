export class HttpError extends Error {
    httpStatusCode: number;

    errorData: unknown;

    constructor(message: string, httpStatusCode: number, errorData?: unknown) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        this.errorData = errorData;
    }
}

export function isHttpError(error: unknown): error is HttpError {
    return (
        error instanceof HttpError
        || (error instanceof Error && 'httpStatusCode' in error)
    );
}
