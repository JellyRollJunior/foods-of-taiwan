import * as db from '../db/queries.js';

const getHomepage = async (request, response) => {
    const countFood = await db.getCountFoods();
    const countCategories = await db.getCountCategories();
    response.render('index', {
        countFood: countFood,
        countCategories: countCategories,
    });
};

export { getHomepage };
