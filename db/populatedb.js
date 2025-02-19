import pg from 'pg';
import fs from 'fs';
import { connectionString } from './connection.js';

const sql = fs.readFileSync('./db/populatedb.sql').toString();
async function main() {
    console.log('seeding...');
    const client = new pg.Client({ connectionString });
    await client.connect();
    await client.query(sql);
    await client.end();
    console.log('done');
}

main();
