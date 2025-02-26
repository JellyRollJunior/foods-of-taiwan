import { Router } from 'express';
import * as foodController from '../controllers/foodsController.js';

const foodRouter = Router();
foodRouter.get('/', foodController.getFoodsPage);

export { foodRouter };
