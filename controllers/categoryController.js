import * as db from '../db/queries.js';

const getCategoriesPage = (request, response) => {
    response.render('categories');
};

export { getCategoriesPage };
