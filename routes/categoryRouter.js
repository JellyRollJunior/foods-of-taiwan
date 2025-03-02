import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();
categoryRouter.get('/', categoryController.getCategoriesPage);

categoryRouter.get('/add', categoryController.getAddCategoriesPage);

export { categoryRouter };
