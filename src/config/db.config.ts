import { Sequelize } from "sequelize";
import { config } from "dotenv";
config()


const sequelize = new Sequelize(process.env.db_name as string, process.env.username as string, process.env.password as string, {
  host: process.env.host,
  dialect: 'postgres', 
  logging: false
});

export {sequelize}