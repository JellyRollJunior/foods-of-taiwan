import pg from 'pg';
import fs from 'fs';
import { connectionString } from '../db/connection.js';

const readFileError = (error) => {
    console.log('Error reading file');
    console.log(error);
    return;
};

async function main() {
    const client = new pg.Client({ connectionString });
    try {
        console.log('seeding...');
        const sql = fs.readFileSync(
            './scripts/populatedb.sql',
            { encoding: 'utf8' },
            readFileError
        );
        await client.connect();
        await client.query(sql);
        console.log('done');
    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

main();
