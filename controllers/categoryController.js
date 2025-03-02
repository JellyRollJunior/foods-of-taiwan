import * as db from '../db/queries.js';

const getCategoriesPage = async (request, response) => {
    const categories = await db.getCategories();
    response.render('categories', {
        categories
    });
};

const getAddCategoriesPage = async (request, response) => {
    response.render('addCategory');
}

export { getCategoriesPage, getAddCategoriesPage };
