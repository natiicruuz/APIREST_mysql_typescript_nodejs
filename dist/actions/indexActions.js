"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActions = exports.userActions = exports.AgencyActions = exports.agencyActions = exports.CarActions = exports.carActions = void 0;
const indexUtils_1 = require("../utils/indexUtils");
const indexData_1 = require("../data/indexData");
const carActions_1 = require("./carActions");
Object.defineProperty(exports, "CarActions", { enumerable: true, get: function () { return carActions_1.CarActions; } });
const agencyActions_1 = require("./agencyActions");
Object.defineProperty(exports, "AgencyActions", { enumerable: true, get: function () { return agencyActions_1.AgencyActions; } });
const userActions_1 = require("./userActions");
Object.defineProperty(exports, "UserActions", { enumerable: true, get: function () { return userActions_1.UserActions; } });
const carActions = new carActions_1.CarActions(indexData_1.carRepository, indexUtils_1.logger, indexUtils_1.exception, new indexUtils_1.Uuid());
exports.carActions = carActions;
const agencyActions = new agencyActions_1.AgencyActions(indexData_1.agencyRepository, indexUtils_1.logger, indexUtils_1.exception, new indexUtils_1.Uuid());
exports.agencyActions = agencyActions;
const userActions = new userActions_1.UserActions(indexData_1.userRepository, indexUtils_1.logger, indexUtils_1.exception, new indexUtils_1.Uuid());
exports.userActions = userActions;