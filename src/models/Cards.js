import { DataTypes, Model } from "sequelize";


export default class Cards extends Model{
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Cards",
    })
  }
}