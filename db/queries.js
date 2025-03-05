import { pool } from './pool.js';
import { databaseHandler } from './databaseHandler.js';

const getFoodById = databaseHandler(async (id) => {
    const query = `
        SELECT 
            foods.id AS id,
            foods.title AS title,
            ARRAY_AGG(categories.id) AS category_ids,
            foods.description,
            foods.is_default_value AS default
        FROM foods 
        JOIN food_categories ON foods.id = food_categories.food_id 
        JOIN categories ON food_categories.category_id = categories.id
        WHERE foods.id = ($1)
        GROUP BY foods.id
    `;
    const { rows } = await pool.query(query, [id]);
    console.log(rows);
    return rows[0];
}, 'Error retrieving food');

const getFoods = databaseHandler(async () => {
    const query = `
        SELECT 
            foods.id,
            foods.title,
            foods.description,
            foods.is_default_value AS default,
            STRING_AGG(categories.title, ', ') AS categories
        FROM foods
        LEFT JOIN food_categories AS fc ON foods.id = fc.food_id
        LEFT JOIN categories ON fc.category_id = categories.id
        GROUP BY foods.id
        ORDER BY foods.id;
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}, 'Error retrieving foods');

const getCategoryById = databaseHandler(async (id) => {
    const query = `
        SELECT
            id,
            title,
            description,
            is_default_value AS default
        FROM categories
        WHERE id = ($1)
    `;
    const { rows } = await pool.query(query, [id]);
    console.log(rows);
    return rows[0];
}, 'Error retrieving category');

const getCategories = databaseHandler(async () => {
    const query = `
        SELECT
            id,
            title,
            description,
            is_default_value AS default
        FROM categories
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}, 'Error retrieving categories');

const getCountFoods = databaseHandler(async () => {
    const query = `
        SELECT COUNT(*) AS num_foods 
        FROM foods
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows[0].num_foods;
}, 'Error retrieving food item count');

const getCountCategories = databaseHandler(async () => {
    const query = `
        SELECT COUNT(*) AS num_categories 
        FROM categories
    `;
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows[0].num_categories;
}, 'Error retrieving category item count');

const insertFood = databaseHandler(async (title, description, categoryId) => {
    // insert into foods
    const query = `
        INSERT INTO foods (title, description)
        VALUES ($1, $2)
        RETURNING id
    `;
    const { rowCount, rows } = await pool.query(query, [title, description]);
    console.log(`Rows inserted into foods: ${rowCount}`);
    // insert into food_categories
    await insertFoodCategory(rows[0].id, categoryId);
}, 'Error inserting food');

const insertCategory = databaseHandler(async (title, description) => {
    const query = `
        INSERT INTO categories (title, description)
        VALUES ($1, $2)
    `;
    const { rowCount } = await pool.query(query, [title, description]);
    console.log(`Rows inserted into categories: ${rowCount}`);
}, 'Error inserting category');

const insertFoodCategory = databaseHandler(async (foodId, categoryId) => {
    const query = `
        INSERT INTO food_categories (food_id, category_id)
        VALUES ($1, $2)
    `;
    if (Array.isArray(categoryId)) {
        categoryId.forEach(async (id) => {
            const { rowCount } = await pool.query(query, [foodId, id]);
            console.log(`Rows inserted into food_categories: ${rowCount}`);
        })
    } else {
        const { rowCount } = await pool.query(query, [foodId, categoryId]);
        console.log(`Rows inserted into food_categories: ${rowCount}`);
    }
}, 'Error inserting food category');

// todo multiple
const updateFood = databaseHandler(
    async (id, title, description, categoryId) => {
        const query = `
        UPDATE foods
        SET
            title = ($2),
            description = ($3)
        WHERE id = ($1)
    `;
        const { rowCount } = await pool.query(query, [id, title, description]);
        console.log(`Rows updated in foods: ${rowCount}`);
        await updateFoodCategory(id, categoryId);
    },
    'Error updating food'
);

const updateCategory = databaseHandler(async (id, title, description) => {
    const query = `
        UPDATE categories
        SET
            title = ($2),
            description = ($3)
        WHERE id = ($1)
    `;
    let { rowCount } = await pool.query(query, [id, title, description]);
    console.log(`Rows updated in categories: ${rowCount}`);
}, 'Error updating category');

const updateFoodCategory = databaseHandler(async (foodId, categoryId) => {
    const query = `
        UPDATE food_categories
        SET
            category_id = ($2)
        WHERE food_id = ($1)
    `;
    let { rowCount } = await pool.query(query, [foodId, categoryId]);
    console.log(`Rows updated in food_categories: ${rowCount}`);
}, 'Error updating food category');

// todo multiple
const deleteFood = databaseHandler(async (id) => {
    const query = `
        DELETE 
        FROM foods
        WHERE id = ($1)
    `;
    const { rowCount } = await pool.query(query, [id]);
    console.log(`Rows deleted from foods: ${rowCount}`);
}, 'Error deleting food');

const deleteCategory = databaseHandler(async (id) => {
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
    console.log(`Rows deleted from foods: ${rowCount}`);
    // delete category
    const deleteCategoryQuery = `
        DELETE
        FROM categories
        WHERE id = ($1)
    `;
    ({ rowCount } = await pool.query(deleteCategoryQuery, [id]));
    console.log(`Rows deleted from categories: ${rowCount}`);
}, 'Error deleting category');

export {
    getCountFoods,
    getCountCategories,
    getFoodById,
    getFoods,
    insertFood,
    updateFood,
    deleteFood,
    getCategoryById,
    getCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
};
