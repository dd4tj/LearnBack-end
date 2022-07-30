import homeRouter from './home';
import apiRouter from './apiUser';
import allcodesRouter from './allcodes';

let initWWebRoutes = (app) => {
   app.use('/allcodes', allcodesRouter);
   app.use('/api', apiRouter);

   app.use('/', homeRouter);

};

module.exports = initWWebRoutes;
