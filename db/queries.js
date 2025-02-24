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

const updateCategory = async (id, title, description) => {
    const query = `
        UPDATE categories
        SET
            title = ($2),
            description = ($3)
        WHERE id = ($1)
    `;
    let { rowCount } = await pool.query(query, [id, title, description]);
    console.log(`Num rows updated: ${rowCount}`);
}

const deleteFood = async (id) => {
    const query = `
        DELETE 
        FROM foods
        WHERE id = ($1)
    `;
    const {rowCount} = await pool.query(query, [id]);
    console.log(`Num rows deleted from foods: ${rowCount}`);
}

const deleteCategory = async (id) => {
    // delete foods that use category
    const deleteFoodQuery = `
        DELETE
        FROM foods
        WHERE id IN ( 
            SELECT id
            FROM foods
            JOIN food_categories AS fc ON foods.id = fc.food_id
            WHERE fc.category_id = ($1)
        )
    `;
    let { rowCount } = await pool.query(deleteFoodQuery, [id]);
    console.log(`Num rows deleted from foods: ${rowCount}`);
    // delete category
    const deleteCategoryQuery = `
        DELETE
        FROM categories
        WHERE id = ($1)
    `;
    ({ rowCount } = await pool.query(deleteCategoryQuery, [id]));
    console.log(`Num rows deleted from categories: ${rowCount}`);
}

export { 
    getFoods, 
    getCategories, 
    getCountFoods, 
    getCountCategories,
    updateCategory,
    deleteFood,
    deleteCategory,
};
