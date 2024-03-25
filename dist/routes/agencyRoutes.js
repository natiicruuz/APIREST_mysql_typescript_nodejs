"use strict";
/* eslint-disable @typescript-eslint/unbound-method */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const router = (0, express_1.Router)();
router.get('/api/v1/agency', indexController_1.agencyController.getAgency);
router.post('/api/v1/agency', indexController_1.agencyController.createAgency);
router.put('/api/v1/:uuid/agency', indexController_1.agencyController.updateAgency);
router.delete('/api/v1/:uuid/agency', indexController_1.agencyController.deleteAgency);
exports.default = router;
