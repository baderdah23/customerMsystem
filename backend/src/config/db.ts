import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  host: "localhost",
  port: Number(process.env.db_port),
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected error", err);
});

export default pool;
