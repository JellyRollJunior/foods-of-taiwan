import express from 'express';
import { indexRouter } from './routes/indexRouter.js';
import dotenv from 'dotenv'

// setup
dotenv.config()
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// define routes
app.use('/', indexRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log('Server listening on port: ' + PORT))