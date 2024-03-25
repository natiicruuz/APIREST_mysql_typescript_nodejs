"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectionSequelize_1 = require("../data/connectionSequelize");
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
// const generateJWT = jwt.sign({
// })s
UserModel.init({
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
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    sequelize: connectionSequelize_1.sequelizeConnection,
    tableName: 'user',
    paranoid: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
exports.default = UserModel;
