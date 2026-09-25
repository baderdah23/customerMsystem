import pool from "../../config/db";

export const findUser = async (email: string) => {
  const result = await pool.query(
    "SELECT id, username, email, password FROM users WHERE email = $1",
    [email],
  );

  return result.rows;
};

export const findUserById = async (id: string) => {
  const result = await pool.query(
    "SELECT id, username, email, password FROM users WHERE id = $1",
    [id],
  );

  return result.rows;
};

export const addUser = async (
  username: string,
  email: string,
  Password: string,
) => {
  const qurey = `INSERT INTO users ( username, password, email) VALUES ($1 , $2 , $3) RETURNING *`;
  const result = await pool.query(qurey, [username, Password, email]);

  return result.rows[0];
};
