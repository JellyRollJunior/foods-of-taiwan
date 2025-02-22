import { pool } from './pool.js';

const getFoods = async () => {
    const query = 'SELECT * FROM foods';
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
}

export { getFoods }