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

const renderEditCategoryPage = async (
    request,
    response,
    category,
    statusCode = 200,
    errors
) => {
    const { categoryId } = request.params;
    const editCategoryRoute = `/categories/${categoryId}/edit`;
    response.status(statusCode).render('editCategory', {
        action: editCategoryRoute,
        category,
        errors,
    });
};

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
    // validate categoryId
    const { categoryId } = request.params;
    if (!Number.isInteger(Number(categoryId))) {
        console.log('Error retrieving category');
        return;
    };
    const category = await db.getCategoryById(categoryId);
    renderEditCategoryPage(request, response, category);
};

const postEditCategory = [
    validateCategory,
    async (request, response) => {
        // validate categoryId
        const { categoryId } = request.params;
        if (!Number.isInteger(Number(categoryId))) {
            console.log('Error retrieving category');
            return;
        };
        // verify category is not default
        const category = await db.getCategoryById(categoryId);
        if (category.default) {
            console.log('Default entry cannot be edited');
            return;
        }
        // validate form
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return renderEditCategoryPage(
                request,
                response,
                category,
                400,
                errors.array()
            );
        }
        const title = request.body.title;
        const description = request.body.description;
        await db.updateCategory(categoryId, title, description);
        response.redirect('/categories');
    },
];

export {
    getCategoriesPage,
    getAddCategoriesPage,
    postAddCategory,
    getEditCategory,
    postEditCategory,
};
