import { init, creteApp, runServer } from './app';
import logger from './logger';

const app = creteApp();

init().then(() => {
    runServer({ app, httpPort: 3000 });
}).catch((err: Error) => {
    logger.error('Failed to run loan-eligibility-service server');
    logger.error(err);
    process.exit(1);
});
