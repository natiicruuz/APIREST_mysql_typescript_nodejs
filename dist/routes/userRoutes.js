"use strict";
/* eslint-disable @typescript-eslint/unbound-method */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const router = (0, express_1.Router)();
router.get('/api/v1/user', indexController_1.userController.getUser);
router.post('/api/v1/user', indexController_1.userController.createUser);
router.put('/api/v1/:uuid/user', indexController_1.userController.updateUser);
router.delete('/api/v1/:uuid/user', indexController_1.userController.deleteUser);
exports.default = router;
