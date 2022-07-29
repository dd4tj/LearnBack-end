import express from 'express';
import bodyParser from 'body-parser'; //query param,...
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
import methodOverride from 'method-override';
require('dotenv').config();

let PORT = process.env.PORT || 8080;
let app = express();

// config app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

viewEngine(app);
initWebRoutes(app);

connectDB();

app.listen(PORT, () => {
   console.log(`Backend Nodejs is running on the port: ${PORT}`);
});
