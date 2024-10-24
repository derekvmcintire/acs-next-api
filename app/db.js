// db.js
import { Pool } from 'pg';

const pool = new Pool({
    user: 'derek',         // your database username
    host: 'localhost',      // your database host
    database: 'acs', // your database name
    password: 'acs', // your database password
    port: 5432,             // your database port (default is 5432)
});

export default pool;
