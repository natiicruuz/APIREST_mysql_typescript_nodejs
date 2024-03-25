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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActions = void 0;
class UserActions {
    constructor(userRepository, logger, exception, uuidGenerator) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.exception = exception;
        this.uuidGenerator = uuidGenerator;
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.getUser();
            return result;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[UserAction][create] -> starting...');
                let newUser;
                if (user === null ||
                    user === undefined ||
                    Object.keys(user).length === 0) {
                    newUser = null;
                }
                else {
                    const uuidCategory = this.uuidGenerator.generate();
                    user.uuid = uuidCategory;
                    newUser = yield this.userRepository.createUser(user);
                }
                this.logger.info('[UserAction][create] -> end.');
                return newUser;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateUser(uuid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[UserAction][update] -> starting...');
                let userUpdated;
                console.log(uuid);
                if ((uuid !== null || uuid !== undefined) &&
                    (user !== null || user !== undefined)) {
                    userUpdated = yield this.userRepository.updateUser(uuid, user);
                }
                else {
                    userUpdated = null;
                }
                this.logger.info('[UserAction][update] -> end.');
                return userUpdated;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[UserAction][delete] -> starting...');
                let userDeleted;
                if (uuid === null || uuid === undefined) {
                    userDeleted = null;
                }
                else {
                    userDeleted = yield this.userRepository.deleteUser(uuid);
                }
                this.logger.info('[UserAction][delete] -> end.');
                console.log('user deleted: ', userDeleted);
                return userDeleted;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.UserActions = UserActions;
