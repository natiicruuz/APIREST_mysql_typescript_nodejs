"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectionSequelize_1 = require("../data/connectionSequelize");
const sequelize_1 = require("sequelize");
class SaleModel extends sequelize_1.Model {
}
SaleModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    user: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: connectionSequelize_1.sequelizeConnection,
    tableName: 'sale',
    paranoid: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
exports.default = SaleModel;
