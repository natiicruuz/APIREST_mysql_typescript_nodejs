"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class Date {
    constructor() {
        this.sysDate = (0, moment_timezone_1.default)().tz('Europe/Madrid').format();
    }
    getSysDate() {
        return this.sysDate;
    }
    getSysDateString() {
        return this.sysDate.toString();
    }
}
exports.Date = Date;
