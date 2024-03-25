import { sequelizeConnection } from '../data/ConnectionSequelize'
import { DataTypes, Model, type Optional } from 'sequelize'

interface IAgencyAttributes {
  id: number
  uuid: string
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IAgencyInput extends Optional<IAgencyAttributes, 'id'> {}

class AgencyModel extends Model<IAgencyAttributes, IAgencyInput> implements IAgencyAttributes {
  public id!: number
  public uuid!: string
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

AgencyModel.init({
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
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  tableName: 'agency',
  paranoid: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

export default AgencyModel
