import homeRouter from './home';
import apiRouter from './apiUser';

let initWWebRoutes = (app) => {
   app.use('/api/login', apiRouter);

   app.use('/', homeRouter);

};

module.exports = initWWebRoutes;
