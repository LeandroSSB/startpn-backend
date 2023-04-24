import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto"
import database from "./../database/index.js"
import bcrypt from "bcrypt"
dotenv.config()

const secret = process.env.TOKEN_CLIENT
const User = database.models.Users

class ControllerUser {
  async getUser(req, res) {
    try{
      const { email } = req.authenticated
      
      const user = await User.findOne({ email })
        
      const {hashedPassword, ...data} = user.get()
      
      return res.status(200).send(data)
    }catch(e) {
      return res.status(500).json({ error: e.message })
    }

  }
  async postUser(req, res){
    try {
      const newUser = await User.create(...req.body)
      await newUser.save()
      
      return res.status(201).send(newUser.get())

    }catch(e) {
      return res.status(400).json({error: "Invalid fields" + e})
    }
  }
  async login(req, res){
    try{

      const user = req.authenticated.get()
      
      let token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "30h" })
      
      return res.status(200).json({ token })
    }catch(e){
      return res.status(401).json({ error: e.message})
    }
  }
  async update(req, res){
    try{
      const { email } = req.authenticated
      
      const user = await User.findOne({ email: email})
  
      user.update(req.body)
      user.save()


      const { hashedPassword, ...data} = user.get()
      
      return res.status(200).send(data)
    }catch(error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export default new ControllerUser