"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const SettingsDate_1 = require("./SettingsDate");
class Logger {
    constructor() {
        this.settings = new SettingsDate_1.SettingsDate();
        this.loggerTransport = [new winston_1.default.transports.Console(this.settings.config)];
        this.logger = winston_1.default.createLogger({
            transports: this.loggerTransport,
            exitOnError: false
        });
    }
    static callLogger() {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    error(text) {
        const res = this.logger.error(text);
        return res;
    }
    info(text) {
        const res = this.logger.info(text);
        return res;
    }
    debug(text) {
        const res = this.logger.debug(text);
        return res;
    }
}
exports.Logger = Logger;
