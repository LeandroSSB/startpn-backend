import database from "../database/index.js"

const Categories = database.models.Categories

class ControllerCategories {
  async get(req, res) {
    try{
      const { email } = req.authenticated
        const categories = await Categories.findAll({
          include: {
            model: database.models.Users,
            where: {
              email: email
            },
            attributes: { exclude: ["hashedPassword"]}
          }
        })

        return res.status(200).send(categories)
    }catch(error){
      return res.status(500).json({ error: error.message})
    }
  }
  async post(req, res) {
    try{
      const { id } = req.authenticated
  
      const card = await Categories.create({...req.body, UserId: id}, { include: [{model: database.models.Users , association: Categories.Users} ,]})
      card.save()

      return res.status(201).send(card)
    }catch(error){
      return res.status(500).json({error: error.message})
    }
  }
}

export default new ControllerCategories