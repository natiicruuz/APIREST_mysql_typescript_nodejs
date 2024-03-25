import { sequelizeConnection } from '../data/ConnectionSequelize'
import { DataTypes, Model, type Optional } from 'sequelize'
// import jwt from 'jsonwebtoken'
interface IUserAttributes {
  id: number
  uuid: string
  name: string
  email: string
  password: string
  saleId: number
  isAdmin: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IUserInput extends Optional<IUserAttributes, 'id'> {}

class UserModel
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes {
  public id!: number
  public uuid!: string
  public name!: string
  public email!: string
  public password!: string
  public isAdmin!: boolean
  public saleId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    },
    saleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: 'sale_id'
    }

  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'user',
    paranoid: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  }
)

export default UserModel
