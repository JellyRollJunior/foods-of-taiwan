import * as db from '../db/queries.js';

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

const postAddFood = async (request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const categoryId = request.body.categoryId;
    await db.insertFood(title, description, categoryId);
    response.redirect('/foods');
};

export { getFoodsPage, getAddFoodPage, postAddFood };
