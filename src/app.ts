/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/Products/product.routes';
import router from './app/routes';




const app: Application = express();

//parsers
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());


app.use('/api', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server !');
});



export default app;

