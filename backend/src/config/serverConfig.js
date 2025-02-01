import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;