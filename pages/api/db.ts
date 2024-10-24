import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } =
  process.env as NodeJS.ProcessEnv;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT), // Convert port to number
});

export default pool;
