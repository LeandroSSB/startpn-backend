import jwt from "jsonwebtoken"
import { promisify } from "util"
import dotenv from "dotenv"
dotenv.config()

export default async (req, res, next) => {

  const authHeader = req.headers.authorization

  if(!authHeader){
    return res.status(401).json({ error: "Token inválido" })
  }

  const [, token ] = authHeader.split(' ')

  try {
    jwt.verify(token, process.env.TOKEN_CLIENT, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" })
      }
      req.authenticated = decoded
    })
  } catch(error){
    return res.status(401).json({ error: "Token inválido" })
  }

  return next()
}