import { Sequelize } from "sequelize";
import { config } from "dotenv";
config()


const sequelize = new Sequelize(process.env.db_name, process.env.username, process.env.password, {
  host: process.env.host,
  dialect: 'postgres', 
  logging: false
});

export {sequelize}