import { pool } from './pool.js';

const getCategories = async () => {
    const query = `
        SELECT * 
        FROM categories
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
};

const getFoods = async () => {
    const query = `
        SELECT 
            foods.id AS id,
            foods.title AS food, 
            categories.title AS category,
            foods.description 
        FROM foods 
        JOIN food_categories ON foods.id = food_categories.food_id 
        JOIN categories ON food_categories.category_id = categories.id
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
};

const getCountFoods = async () => {
    const query = `
        SELECT COUNT(*) AS num_foods 
        FROM foods
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}

const getCountCategories = async () => {
    const query = `
        SELECT COUNT(*) AS num_categories 
        FROM categories
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}

const deleteFood = async (id) => {
    const deleteFoodCategoryQuery = `
        DELETE 
        FROM food_categories
        WHERE food_id = ($1)
    `;
    const deleteFoodQuery = `
        DELETE 
        FROM foods
        WHERE id = ($1)
    `;
    let { rowCount } = await pool.query(deleteFoodCategoryQuery, [id]);
    console.log(`Num rows delete from food_category: ${rowCount}`);
    ({rowCount} = await pool.query(deleteFoodQuery, [id]));
    console.log(`Num rows delete from foods: ${rowCount}`);
}

export { 
    getFoods, 
    getCategories, 
    getCountFoods, 
    getCountCategories,
    deleteFood
};
