import { creteApp, runServer } from './app';

const app = creteApp();
runServer({ app, httpPort: 3000 });
