import dotenv from "dotenv"
dotenv.config()

export default {
  dialect: "postgres",
  host: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,

  pool: {
    max:5,
    min: 0,
    idle: 10000
  },
}