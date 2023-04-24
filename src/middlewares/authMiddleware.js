import jwt from "jsonwebtoken"
import { promisify } from "util"
import dotenv from "dotenv"
import { ErrorHandler } from "../utils/error.js"
dotenv.config()

export default async (req, res, next) => {

  try {
  const authHeader = req.headers.authorization || req.headers.Authorization

  
  if(!authHeader){
    throw new ErrorHandler({ statusCode: 401, message: "Token inválido" })
  }
  
  const [, token ] = authHeader.split(' ')
  console.log(token)
  
    jwt.verify(token, process.env.TOKEN_CLIENT, (err, decoded) => {
      if (err) {
        throw new ErrorHandler({ statusCode: 401, message: err.message })
      }
      req.authenticated = decoded
    })

    return next()
  } catch(error){
    return next(error)
  }

}