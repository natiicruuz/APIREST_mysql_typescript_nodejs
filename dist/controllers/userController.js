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
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor(userAction, logger, exception, responseFormat) {
        this.userAction = userAction;
        this.logger = logger;
        this.exception = exception;
        this.responseFormat = responseFormat;
        this.getUser = this.getUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userAction.getUser();
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const response = yield this.responseFormat.run(result, protocol, host, path, 200);
                res.json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[UserController][createUser] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const { name, email, password, isAdmin } = req.body;
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(password, salt);
                const user = { name, email, hashPassword, isAdmin };
                const newUser = yield this.userAction.createUser(user);
                let result;
                if (newUser === null) {
                    result = null;
                    res
                        .status(404)
                        .send('Error: user was not created, please insert valid inputs.');
                }
                result = yield this.responseFormat.run(newUser, protocol, host, path, 200);
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[UserController][updateUser] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const uuid = req.params.uuid;
                const user = Object.assign({}, req.body);
                const userUpdated = yield this.userAction.updateUser(uuid, user);
                let result;
                if (userUpdated === null) {
                    result = yield this.responseFormat.run(['User has not been updated.'], protocol, host, path, 404);
                    res.status(404);
                }
                else {
                    result = yield this.responseFormat.run(['User has been updated successfully.'], protocol, host, path, 200);
                    res.status(200);
                }
                this.logger.info('[UserController][update] -> end.');
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[UserController][deleteUser] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const uuid = req.params.uuid;
                const userDeleted = yield this.userAction.deleteUser(uuid);
                let result;
                if (userDeleted === null) {
                    result = yield this.responseFormat.run(['User has not been deleted.'], protocol, host, path, 404);
                    res.status(404);
                }
                else {
                    result = yield this.responseFormat.run(['User has been deleted successfully.'], protocol, host, path, 200);
                    res.status(200);
                }
                this.logger.info('[UserController][delete] -> end.');
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.UserController = UserController;
