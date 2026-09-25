import pool from "../../config/db";

type CustomerData = {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  gender: string;
  age: number;
  country: string;
};
export const getCustomerById = async (customerId: string, id: string) => {
  const query = "SELECT * FROM customers WHERE id = $1 AND created_by = $2";
  const result = await pool.query(query, [customerId, id]);
  return result.rows;
};

// get all customer
export const getAllAndSearchCustomer = async (search: string, id: string) => {
  let query = "";
  let values: any[] = [];
  if (search && typeof search === "string" && search.trim() !== "") {
    query = `
      SELECT *
      FROM customers
      WHERE (first_name ILIKE $1 
         OR last_name ILIKE $1 )
         AND created_by = $2
      ORDER BY id DESC;
    `;
    values = [`%${search}%`, id];
  } else {
    query =
      "SELECT * FROM customers WHERE created_by = $1 ORDER BY first_name ASC LIMIT 100;";
    values = [id];
  }

  const result = await pool.query(query, values);
  return result.rows;
};

export const createCustomerRepo = async (data: CustomerData, id: string) => {
  const queryText = `
   INSERT INTO customers (first_name, last_name, email, telephone, gender, age, country, created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8)
;
  `;
  const values = [
    data.first_name,
    data.last_name,
    data.email,
    data.telephone,
    data.gender,
    data.age,
    data.country,
    id,
  ];

  const queryResult = await pool.query(queryText, values);
  return queryResult;
};

export const updateCustomerRepo = async (
  data: CustomerData,
  id: string,
  userId: string,
) => {
  const qureyText = `
      UPDATE customers
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        telephone = $4,
        gender = $5,
        age = $6,
        country = $7
      WHERE id = $8 AND created_by = $9
      RETURNING id, first_name, last_name, email, telephone, gender, age, country;
    `;

  const values = [
    data.first_name,
    data.last_name,
    data.email,
    data.telephone,
    data.gender,
    data.age,
    data.country,
    id,
    userId,
  ];

  const result = await pool.query(qureyText, values);
  return result.rows;
};
export const deleteCustomerRepo = async (id: string, userId: string) => {
  const query = `
    DELETE FROM customers
    WHERE id = $1 AND created_by = $2
    RETURNING id
  `;

  const result = await pool.query(query, [id, userId]);
  return result;
};
