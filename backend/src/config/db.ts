import { Pool } from "pg";
import "dotenv/config";

// const pool = new Pool({
//   host: "localhost",
//   port: Number(process.env.db_port),
//   user: process.env.db_user,
//   password: process.env.db_password,
//   database: process.env.db_database,
// });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ميزة SSL مطلوبة إجبارياً للاتصال بقواعد البيانات السحابية (Neon / Supabase)
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected error", err);
});

export default pool;
