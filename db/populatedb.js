import pg from 'pg';
import fs from 'fs';
import { connectionString } from './connection.js';

async function main() {
    console.log('seeding...');
    const sql = fs.readFileSync('./db/populatedb.sql',  { encoding: 'utf8' });
    const client = new pg.Client({ connectionString });
    await client.connect();
    await client.query(sql);
    await client.end();
    console.log('done');
}

main();
