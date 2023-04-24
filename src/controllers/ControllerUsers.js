import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto"
import database from "./../database/index.js"
import bcrypt from "bcrypt"
import { ErrorHandler } from "../utils/error.js"
dotenv.config()

const secret = process.env.TOKEN_CLIENT
const User = database.models.Users

class ControllerUser {
  async getUser(req, res, next) {
    try{
      const { email } = req.authenticated
      
      const user = await User.findOne({ email })
      if(!user) {
        throw new ErrorHandler({statusCode: 404, message: "Token refering to a inexistent user"})
      }
      
      return res.status(200).send(user.get())
    }catch(e) {
      return next(e)
    }

  }
  async postUser(req, res, next){
    try {
      const newUser = await User.create(req.body)
      await newUser.save()
      
      const { password, ...output } = newUser.get() 
      
      return res.status(201).send(output)

    }catch(e) {
      return next(e)
    }
  }
  async login(req, res, next){
    try{

      const user = req.authenticated.get()
      
      let token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "30h" })
      
      return res.status(200).json({ token })
    }catch(e){
      return next(error)
    }
  }
  async update(req, res, next){
    try{
      const { email } = req.authenticated
      
      const user = await User.findOne({ email: email})
  
      user.update(req.body)
      user.save()


      const { hashedPassword, ...data} = user.get()
      
      return res.status(200).send(data)
    }catch(error) {
      return next(error)
    }
  }
}

export default new ControllerUser