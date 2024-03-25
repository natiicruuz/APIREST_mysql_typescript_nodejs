"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectionSequelize_1 = require("../data/connectionSequelize");
const sequelize_1 = require("sequelize");
class AgencyModel extends sequelize_1.Model {
}
AgencyModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
    sequelize: connectionSequelize_1.sequelizeConnection,
    tableName: 'agency',
    paranoid: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
exports.default = AgencyModel;
