import dotenv from "dotenv";

export const loadDotenv = () => {
  return dotenv.config();
};

export const ENV_NAME = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
};
