"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000',
    NODE_ENV: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development',
    MYSQL_HOST: (_c = process.env.MYSQL_HOST) !== null && _c !== void 0 ? _c : '',
    MYSQL_USER: (_d = process.env.MYSQL_USER) !== null && _d !== void 0 ? _d : '',
    MYSQL_PASSWORD: (_e = process.env.MYSQL_PASSWORD) !== null && _e !== void 0 ? _e : '',
    MYSQL_DATABASE: (_f = process.env.MYSQL_DATABASE) !== null && _f !== void 0 ? _f : ''
};
