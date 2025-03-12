import dotenv from 'dotenv';
dotenv.config();

const connectionString = `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`;

export { connectionString };
