import express from 'express';
import bodyParser from 'body-parser'; //query param,...
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
import methodOverride from 'method-override';
require('dotenv').config();

let PORT = process.env.PORT || 8080;
let app = express();

// alow cors for all requests from all domains
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.URL);
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
	);
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS, PATCH');
   res.header('Access-Control-Allow-Credentials', true);
	next();
});

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
