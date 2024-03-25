import { sequelizeConnection } from '../data/ConnectionSequelize'
import { DataTypes, Model, type Optional } from 'sequelize'

interface ISaleAttributes {
  id: number
  uuid: string
  ownerId: number
  price: number
  agencyId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ISaleInput extends Optional<ISaleAttributes, 'id'> {}

class SaleModel
  extends Model<ISaleAttributes, ISaleInput>
  implements ISaleAttributes {
  public ownerId!: number
  public price!: number
  public id!: number
  public uuid!: string
  public agencyId!: number

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
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: 'owner_id',
      allowNull: false
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    agencyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: 'agency_id',
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
