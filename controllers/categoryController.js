import * as db from '../db/queries.js';

const getCategoriesPage = async (request, response) => {
    const categories = await db.getCategories();
    response.render('categories', {
        categories
    });
};

export { getCategoriesPage };
