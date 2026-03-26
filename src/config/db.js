import mysql from 'mysql2/promise'; // Use the promise version for async/await
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // XAMPP default is an empty string
    database: process.env.DB_NAME,
    port: 3306, // Default XAMPP MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;