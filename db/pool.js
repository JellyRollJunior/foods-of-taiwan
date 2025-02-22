import pg from 'pg';
import { connectionString } from './connection.js';
const { Pool } = pg;

const pool = new Pool({
    connectionString,
});

export { pool };
