import * as db from '../db/queries.js';

const getFoodsPage = async (request, response) => {
    response.render('foods', {
        title: 'Taiwanese Food Guide',
    });
};

export { getFoodsPage };
