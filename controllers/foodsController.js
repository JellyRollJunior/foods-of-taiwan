import * as db from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const lengthErr = 'must be between 1 and 25 characters';
const descriptionErr = 'must be between 1 and 250 characters';
const categoryErr = 'Error selecting category';

const validateFood = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 25 })
        .withMessage(`Title ${lengthErr}`),
    body('description')
        .trim()
        .isLength({ min: 1, max: 250 })
        .withMessage(`Description ${descriptionErr}`),
    body('categoryId')
    .trim()
    .isInt()
    .withMessage(categoryErr),
];

const getFoodsPage = async (request, response) => {
    const foods = await db.getFoods();
    console.log(foods);
    response.render('foods', {
        title: 'Taiwanese Food Guide',
        foods,
    });
};

const getAddFoodPage = async (request, response) => {
    const categories = await db.getCategories();
    console.log(categories);
    response.render('addFood', {
        title: 'Taiwanese Food Guide',
        categories,
    });
};

const postAddFood = [
    validateFood,
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const categories = await db.getCategories();
            return response.status(400).render('addFood', {
                title: 'Taiwanese Food Guide',
                categories,
                errors: errors.array(),
            });
        }
        const title = request.body.title;
        const description = request.body.description;
        const categoryId = request.body.categoryId;
        await db.insertFood(title, description, categoryId);
        response.redirect('/foods');
    },
];

export { getFoodsPage, getAddFoodPage, postAddFood };
