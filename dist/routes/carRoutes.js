"use strict";
/* eslint-disable @typescript-eslint/unbound-method */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const router = (0, express_1.Router)();
router.get('/api/v1/car', indexController_1.carController.getCar);
router.post('/api/v1/car', indexController_1.carController.createCar);
router.put('/api/v1/:uuid/car', indexController_1.carController.updateCar);
router.delete('/api/v1/:uuid/car', indexController_1.carController.deleteCar);
exports.default = router;
