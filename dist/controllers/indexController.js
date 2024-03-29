"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.userController = exports.AgencyController = exports.agencyController = exports.CarController = exports.carController = void 0;
const indexUtils_1 = require("../utils/indexUtils");
const carController_1 = require("./carController");
Object.defineProperty(exports, "CarController", { enumerable: true, get: function () { return carController_1.CarController; } });
const agencyController_1 = require("./agencyController");
Object.defineProperty(exports, "AgencyController", { enumerable: true, get: function () { return agencyController_1.AgencyController; } });
const userController_1 = require("./userController");
Object.defineProperty(exports, "UserController", { enumerable: true, get: function () { return userController_1.UserController; } });
const indexActions_1 = require("../actions/indexActions");
const carController = new carController_1.CarController(indexActions_1.carActions, indexUtils_1.logger, indexUtils_1.exception, indexUtils_1.responseFormat);
exports.carController = carController;
const agencyController = new agencyController_1.AgencyController(indexActions_1.agencyActions, indexUtils_1.logger, indexUtils_1.exception, indexUtils_1.responseFormat);
exports.agencyController = agencyController;
const userController = new userController_1.UserController(indexActions_1.userActions, indexUtils_1.logger, indexUtils_1.exception, indexUtils_1.responseFormat);
exports.userController = userController;
