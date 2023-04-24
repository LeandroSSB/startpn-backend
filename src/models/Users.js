import {  Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

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
          unique: true,
          get() {
            const rawValue = this.getDataValue("email")
            return rawValue.toLowerCase()
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(password) {
            const hashed = bcrypt.hashSync(password, 10)
            this.setDataValue('password', hashed)
          }, 
        },
        phoneNumber: {
          type: DataTypes.STRING
        },
        accountImage: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        defaultScope: {
          attributes: { exclude: ['password'] }
        },
        modelName: "Users"
      }
    )
  }
}
