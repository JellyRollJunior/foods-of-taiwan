import { pool } from './pool.js';

const getCategories = async () => {
    const query = 'SELECT * FROM categories';
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
};

const getFoods = async () => {
    const query = 
        `SELECT 
            foods.title AS food, 
            categories.title AS category,
            foods.description 
        FROM foods 
        JOIN food_categories ON foods.id = food_categories.food_id 
        JOIN categories ON food_categories.category_id = categories.id`;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
};

const getCountFoods = async () => {
    const query = 
        `SELECT COUNT(*) AS num_foods 
        FROM foods`;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}

const getCountCategories = async () => {
    const query = 
        `SELECT COUNT(*) AS num_categories 
        FROM categories`
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}

export { getFoods, getCategories, getCountFoods, getCountCategories };
