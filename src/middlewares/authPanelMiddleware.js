import jwt from "jsonwebtoken"
import crypto from "crypto"
import database from "./../database/index.js"
import bcrypt from "bcrypt"
import { ErrorHandler } from "../utils/error.js"

export default async (req, res, next) => { 
  try{
    const User = database.models.Users
  
    const { email, password  } = req.body
    
    const user = await User.findOne({ email: email , attributes: { include: ["password"]}})
  
    if (!user) {
      throw new ErrorHandler({ statusCode: 401, message: "Email ou senha inválidos" })
    } 
  
    const match = bcrypt.compareSync(password, user.password)
  
    if(!match) {
      return next("Email ou senha inválidos")
    }
  
    req.authenticated = user
  
    return next()
  }catch (error) {
    next(error)
  }
}