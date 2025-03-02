import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();
categoryRouter.get('/', categoryController.getCategoriesPage);

categoryRouter.get('/add', categoryController.getAddCategoriesPage);
categoryRouter.post('/add', categoryController.postAddCategory);

categoryRouter.get('/:categoryId/edit', categoryController.getEditCategory);
categoryRouter.post ('/:categoryId/edit', categoryController.postEditCategory);

export { categoryRouter };
