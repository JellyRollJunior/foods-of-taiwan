#! /usr/bin/env node
import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const sql = fs.readFileSync('./db/populatedb.sql').toString();
async function main() {
    console.log('seeding...');
    const client = new pg.Client({
        connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
    });
    await client.connect();
    await client.query(sql);
    await client.end();
    console.log('done');
}

main();
