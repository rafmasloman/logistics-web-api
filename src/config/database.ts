import { Pool } from "pg";
import { ENV_NAME } from "../libs/dotenv";

export const pool = new Pool({
  host: ENV_NAME.DB_HOST,
  user: ENV_NAME.DB_USER,
  password: ENV_NAME.DB_PASS,
  database: ENV_NAME.DB_NAME,
});

export const db = async () => {
  const connectDb = await pool.connect();

  return connectDb;
};
