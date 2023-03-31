import { Model, DataTypes } from "sequelize";


export default class Categories extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
  
      },
      {
        sequelize,
        modelName: "Categories",
      });
  }
  
}