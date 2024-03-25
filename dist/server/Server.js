"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const indexUtils_1 = require("../utils/indexUtils");
const indexRoutes_1 = __importDefault(require("../routes/indexRoutes"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor(port) {
        this._port = port;
        this._app = (0, express_1.default)();
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: false }));
        this._app.use(indexRoutes_1.default);
        this._app.enable('trust proxy');
        this._app.disable('x-powered-by');
        this._logger = indexUtils_1.logger;
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app.listen(this._port, () => __awaiter(this, void 0, void 0, function* () {
                this._logger.info(`[car_project] Listening on port ${this._port}`);
            }));
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                if (this._httpServer != null) {
                    this._httpServer.close(error => {
                        if (error != null) {
                            reject(error);
                            return;
                        }
                        resolve();
                    });
                }
                resolve();
            });
        });
    }
}
exports.Server = Server;
