import * as db from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const ADD_CATEGORY_ROUTE = '/categories/add';

const LENGTH_ERROR = 'must be between 1 and 25 characters';
const DESCRIPTION_ERROR = 'must be between 1 and 250 characters';
const validateCategory = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 25 })
        .withMessage(`Title ${LENGTH_ERROR}`),
    body('description')
        .trim()
        .isLength({ min: 1, max: 400 })
        .withMessage(`Description ${DESCRIPTION_ERROR}`),
];

const getCategoriesPage = async (request, response) => {
    const categories = await db.getCategories();
    response.render('categories', {
        categories,
    });
};

const getAddCategoriesPage = async (request, response) => {
    response.render('addCategory', {
        action: ADD_CATEGORY_ROUTE,
    });
};

const postAddCategory = [
    validateCategory,
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.render('addCategory', {
                action: ADD_CATEGORY_ROUTE,
                errors: errors.array(),
            });
            return;
        }
        const title = request.body.title;
        const description = request.body.description;
        await db.insertCategory(title, description);
        response.redirect('/categories');
    },
];

const getEditCategory = async (request, response) => {
    const { categoryId } = request.params;
    const EDIT_CATEGORY_ROUTE = `/categories/${categoryId}/edit`;
    response.render('editCategory', {
        action: EDIT_CATEGORY_ROUTE,
    });
};

export {
    getCategoriesPage,
    getAddCategoriesPage,
    postAddCategory,
    getEditCategory,
};
