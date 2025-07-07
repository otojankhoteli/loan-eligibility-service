import { type RequestHandler } from 'express';
import { HttpError } from './error';

const { API_KEY } = process.env;

const authenticator: RequestHandler = (req, res, next) => {
    const apiKey = req.get('x-api-key');
    if (apiKey === API_KEY) return next();

    throw new HttpError('Invalid API Key', 403);
};

export default authenticator;
