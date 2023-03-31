import dotenv from "dotenv"
dotenv.config()

export default {
  dialect: "postgres",
  host: "localhost",
  username: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: 5432,

  pool: {
    max:5,
    min: 0,
    idle: 10000
  }
}