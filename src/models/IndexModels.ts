import AgencyModel from './AgencyModel'
import CarModel from './CarModel'
import SaleModel from './SaleModel'
import UserModel from './UserModel'

const agencyHasManyCarsModel = AgencyModel.hasMany(CarModel, {
  as: 'cars',
  foreignKey: 'agency_id'
})

const agencyHasManySalesModel = AgencyModel.hasMany(SaleModel, {
  as: 'sale',
  foreignKey: 'agency_id'
})

const userHasManySalesModel = UserModel.hasMany(SaleModel, {
  as: 'sales',
  foreignKey: 'owner_id'
})

export {
  agencyHasManyCarsModel,
  userHasManySalesModel,
  agencyHasManySalesModel
}
