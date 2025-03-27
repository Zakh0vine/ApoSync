import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, // Nama database
  process.env.DB_USER, // User MySQL
  process.env.DB_PASSWORD, // Password MySQL
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Matikan logging query SQL
  }
);
