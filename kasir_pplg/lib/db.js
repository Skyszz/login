import mysql from "mysql2/promise";
const g = globalThis;
export const db = (g._db ??= mysql.createPool({
  host: process.env.DB_HOST, user: process.env.DB_USER,
  password: process.env.DB_PASS, database: process.env.DB_NAME,
  waitForConnections: true, connectionLimit: 10,
}));
