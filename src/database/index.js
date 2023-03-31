import { Sequelize } from "sequelize";
import Users from "../models/Users.js";
import database from "./database.js";
import Categories from "../models/Categories.js";
import Cards from "../models/Cards.js";



const models = [Users, Categories, Cards]

class Database{
  constructor(){
    this.init()
  }
  
  async init() {
    this.connection = new Sequelize(database)
    
    await Promise.all(models.map(model => {
      model.init(this.connection)
    }));
    
    Users.hasMany(Categories)
    Categories.belongsTo(Users)

    Users.hasMany(Cards)
    Cards.belongsTo(Users)

    Categories.hasMany(Cards)
    Cards.belongsTo(Categories)
    
    this.connection.sync({ force: true})
    
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

  }
}

export default new Database().connection