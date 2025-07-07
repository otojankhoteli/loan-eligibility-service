import express, { type Express } from 'express';
import { defaultErrorHandler } from './middleware';
import logger from './logger';

export const creteApp = () => {
  const app = express();
  app.use(express.json());
  app.use(defaultErrorHandler);

  return app;
};

interface ServerOptions {
  app: Express;
  httpPort?: number;
}

export const runServer = ({
  app,
  httpPort = 80,
}: ServerOptions) => {
  const onStop = () => {
    logger.info('-------- start responding status not ok ------');

    logger.info('-------- Stopping Node ------');
    logger.info(`stopping pid: ${process.pid} ...`);
    process.exit(1);
  };

  process.on('SIGTERM', onStop);
  process.on('SIGINT', onStop);

  process.on('exit', (code) => {
    if (code > 0) {
      logger.error(`Process is about to exit with code: ${code}`);
    } else {
      logger.error(`Process is about to exit with code: ${code}`);
    }
  });

  process.on('uncaughtException', (err) => {
    logger.error(
      `Child had an Uncaught exception\nError: ${err.message}\nStack:${err.stack}`,
    );
  });

  app.listen(httpPort, () => {
    logger.info('-------- Starting Node ------');
    logger.info(`Listening on port ${httpPort}`);
    logger.info(`pid: ${process.pid}`);
  });

  return app;
};
