"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexUtils_1 = require("../utils/indexUtils");
const carRoutes_1 = __importDefault(require("./carRoutes"));
const agencyRoutes_1 = __importDefault(require("./agencyRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
router.use('', carRoutes_1.default);
router.use('', agencyRoutes_1.default);
router.use('', userRoutes_1.default);
/*
router.use('' /* ruta sale ) */
router.use('/', (req, res) => {
    res.json({
        api: 'car-agency'
    });
});
router.use((err, req, res, next) => {
    if (err instanceof indexUtils_1.Exception) {
        res.status(400).json({
            message: err.message
        });
    }
    else {
        next(err);
    }
});
router.use((err, req, res, next) => {
    indexUtils_1.logger.error(err.message);
    res.status(500);
    res.json({
        error: err
    });
});
exports.default = router;
