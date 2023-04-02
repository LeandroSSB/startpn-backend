import jwt from "jsonwebtoken"
import { promisify } from "util"
import dotenv from "dotenv"
dotenv.config()

export default async (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization

  
  if(!authHeader){
    return res.status(401).json({ error: "Token inválido" })
  }
  
  const [, token ] = authHeader.split(' ')
  console.log(token)
  
  try {
    jwt.verify(token, process.env.TOKEN_CLIENT, (err, decoded) => {
      if (err) {
        throw Error("Token Inválido")
      }
      req.authenticated = decoded
    })

    return next()
  } catch(error){
    return res.status(401).json({ error: "Token inválido" })
  }

}