import { sequelizeConnection } from '../data/connectionSequelize'
import { DataTypes, Model, type Optional } from 'sequelize'

interface ISaleAttributes {
  id: number
  uuid: string
  user: string
  price: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ISaleInput extends Optional<ISaleAttributes, 'id'> {}

class SaleModel
  extends Model<ISaleAttributes, ISaleInput>
  implements ISaleAttributes {
  user!: string
  price!: number
  public id!: number
  public uuid!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

SaleModel.init(
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
    user: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'sale',
    paranoid: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  }
)

export default SaleModel
