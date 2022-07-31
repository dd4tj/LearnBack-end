import homeRouter from './home';
import apiRouter from './api';

let initWWebRoutes = (app) => {
   app.use('/api', apiRouter);

   app.use('/', homeRouter);

};

module.exports = initWWebRoutes;
