import createServer from './Infrastructures/http/createServer';

const startApp = async () => {
    await createServer();
};

startApp();
