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
    response.render('addFood', {
        title: 'Taiwanese Food Guide',
    });
};

export { getFoodsPage, getAddFoodPage };
