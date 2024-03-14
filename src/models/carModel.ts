import { sequelizeConnection } from '../data/connectionSequelize'
import { DataTypes, Model, type Optional } from 'sequelize'

interface ICarAttributes {
  id: number
  uuid: string
  name: string
  model: string
  year: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ICarInput extends Optional<ICarAttributes, 'id'> {}

class CarModel extends Model<ICarAttributes, ICarInput> implements ICarAttributes {
  public id!: number
  public uuid!: string
  public name!: string
  public model!: string
  public year!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

CarModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  uuid: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  model: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  tableName: 'car',
  paranoid: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

export default CarModel
