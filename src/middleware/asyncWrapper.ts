import type { RequestHandler } from 'express';
import type ExpressCore from 'express-serve-static-core';

export type AsyncWrapperFn = <
    P = ExpressCore.ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = ExpressCore.Query,
    Locals extends Record<string, unknown> = Record<string, unknown>,
>(
    handler: (
      ...args: Parameters<
      RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
      >
    ) => Promise<void>,
) => RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>;

export const asyncWrapper: AsyncWrapperFn = (fn) => (req, res, next) => fn(req, res, next)
  .catch(next);
