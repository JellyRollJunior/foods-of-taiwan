import * as db from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const SITE_TITLE = 'Taiwanese Food Guide';
const ADD_FOOD_ROUTE = '/foods/add';

const LENGTH_ERROR = 'must be between 1 and 25 characters';
const DESCRIPTION_ERROR = 'must be between 1 and 250 characters';
const CATEGORY_ERROR = 'Error selecting category';
const validateFood = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 25 })
        .withMessage(`Title ${LENGTH_ERROR}`),
    body('description')
        .trim()
        .isLength({ min: 1, max: 400 })
        .withMessage(`Description ${DESCRIPTION_ERROR}`),
    body('categoryId').trim().isInt().withMessage(CATEGORY_ERROR),
];

const renderAddFoodsPage = async (response, statusCode = 200, errors) => {
    const categories = await db.getCategories();
    console.log(categories);
    response.status(statusCode).render('addFood', {
        title: SITE_TITLE,
        action: ADD_FOOD_ROUTE,
        categories,
        errors,
    });
};

const renderEditFoodPage = async (
    request,
    response,
    food,
    statusCode = 200,
    errors
) => {
    // validate foodId
    const { foodId } = request.params;
    if (!Number.isInteger(Number(foodId))) {
        console.log('Error retrieving food');
        return;
    }
    const editFoodRoute = `/foods/${foodId}/edit`;
    const categories = await db.getCategories();
    response.status(statusCode).render('editFood', {
        title: SITE_TITLE,
        action: editFoodRoute,
        categories,
        food,
        errors,
    });
};

const getFoodsPage = async (request, response) => {
    const foods = await db.getFoods();
    console.log(foods);
    response.render('foods', {
        title: 'Taiwanese Food Guide',
        foods,
    });
};

const getAddFoodPage = async (request, response) => {
    renderAddFoodsPage(response);
};

const postAddFood = [
    validateFood,
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            renderAddFoodsPage(response, 400, errors.array());
            return;
        }
        const title = request.body.title;
        const description = request.body.description;
        const categoryId = request.body.categoryId;
        await db.insertFood(title, description, categoryId);
        response.redirect('/foods');
    },
];

const getEditFood = async (request, response) => {
    // validate foodId
    const { foodId } = request.params;
    if (!Number.isInteger(Number(foodId))) {
        console.log('Error retrieving food');
        return;
    }
    const food = await db.getFoodById(foodId);
    renderEditFoodPage(request, response, food);
};

const postEditFood = [
    validateFood,
    async (request, response) => {
        // validate foodId
        const { foodId } = request.params;
        if (!Number.isInteger(Number(foodId))) {
            console.log('Error retrieving food');
            return;
        }
        // verify food is not default
        const food = await db.getFoodById(foodId);
        if (food.default) {
            console.log('Cannot edit default entry');
            return;
        }
        // validate form
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            renderEditFoodPage(request, response, food, 400, errors.array());
            return;
        }
        const title = request.body.title;
        const description = request.body.description;
        const categoryId = request.body.categoryId;
        await db.updateFood(foodId, title, description, categoryId);
        response.redirect('/foods');
    },
];

const deleteFood = async (request, response) => {
    // validate foodId
    const { foodId } = request.params;
    if (!Number.isInteger(Number(foodId))) {
        console.log('Error deleting food');
        return;
    }
    // verify food is not default
    const food = await db.getFoodById(foodId);
    if (food.default) {
        console.log('Default entries cannot be deleted');
        return;
    }
    await db.deleteFood(foodId);
    response.redirect('/foods');
};

export {
    getFoodsPage,
    getAddFoodPage,
    postAddFood,
    getEditFood,
    postEditFood,
    deleteFood,
};
