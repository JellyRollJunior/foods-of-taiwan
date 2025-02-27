import { Router } from 'express';
import * as foodController from '../controllers/foodsController.js';

const foodRouter = Router();
foodRouter.get('/', foodController.getFoodsPage);
foodRouter.get('/add', foodController.getAddFoodPage);

export { foodRouter };
