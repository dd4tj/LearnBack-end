import homeRouter from './home';

let initWWebRoutes = (app) => {
   app.use('/', homeRouter);
};

module.exports = initWWebRoutes;
