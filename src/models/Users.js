import {  Model, DataTypes } from "sequelize";


export default class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        hashedPassword: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phoneNumber: {
          type: DataTypes.STRING
        },
        accountImage: {
          type: DataTypes.STRING(1500)
        },
      },
      {
        sequelize,
        modelName: "Users"
      }
    )
  }
}
