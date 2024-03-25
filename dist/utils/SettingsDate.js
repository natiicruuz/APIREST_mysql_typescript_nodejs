"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsDate = void 0;
const winston_1 = __importDefault(require("winston"));
const Date_1 = require("./Date");
const env_1 = require("../config/env");
const { combine, timestamp, printf, colorize } = winston_1.default.format;
class SettingsDate {
    constructor() {
        this.dateManager = new Date_1.Date();
        this.config = {
            level: env_1.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
            format: combine(colorize(), timestamp({
                format: () => this.dateManager.getSysDateString().toString()
            }), printf((info) => {
                const { level, message } = info, extra = __rest(info, ["level", "message"]);
                return `${info.timestamp} [${level}]: ${message} ${Number.isNaN(Object.keys(extra).length) ? JSON.stringify(extra, null, 2) : ''}`;
            }))
        };
    }
}
exports.SettingsDate = SettingsDate;
