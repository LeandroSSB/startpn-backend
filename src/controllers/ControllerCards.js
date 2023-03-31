import database from "../database/index.js"

const Cards = database.models.Cards

class ControllerCards {
  async get(req, res) {
    try{
      const { email } = req.authenticated
      const cards = await Cards.findAll({
        include: {
          model: database.models.Users,
          where: {
            email: email
          },
          attributes: { exclude: ["hashedPassword"]}
          
        }
      })
      return res.status(200).send(cards)
    }catch(err){
      return res.status(500).json({error: err.message});
    }

  }
  async post(req, res) {
    try{
      const { id } = req.authenticated
  
      const card = await Cards.create({...req.body, UserId: id}, { include: [{model: database.models.Users , association: Cards.Users} ,
         {model: database.models.Categories , association: Cards.Categories}]  })
      card.save()

      return res.status(201).send(card)
    }catch(error){
      return res.status(500).json({error: error.message})
    }

  }
}

export default new ControllerCards