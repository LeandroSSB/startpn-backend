import jwt from "jsonwebtoken"
import crypto from "crypto"
import database from "./../database/index.js"
import bcrypt from "bcrypt"

export default async (req, res, next) => { 
  const User = database.models.Users

  const { email, password  } = req.body
  
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(401).json({ error: "Email ou senha inválidos" })
  } 

  const match = bcrypt.compareSync(password, user.hashedPassword)

  if(!match) {
    return res.status(401).json({ error: "Email ou senha inválidos" })
  }

  req.authenticated = user

  return next()
}