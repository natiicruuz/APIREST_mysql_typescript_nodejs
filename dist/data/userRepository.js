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
const indexUtils_1 = require("../utils/indexUtils");
class UserRepository {
    constructor(userModel, logger, exception) {
        this.userModel = userModel;
        this.logger = logger;
        this.exception = exception;
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userModel.findAll();
            return result;
        });
    }
    createUser(userCreation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[UserRepository][create] -> starting...');
                const { uuid, name, email, password, isAdmin } = userCreation;
                const result = yield this.userModel.create({ uuid, name, email, password, isAdmin });
                this.logger.info('[UserRepository][create] -> end.');
                return result;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateUser(userUuid, userUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[UserRepository][update] -> starting...');
                let response;
                if (userUuid === null || userUuid === undefined) {
                    response = null;
                }
                else {
                    const userUpdated = yield this.userModel
                        .update(userUpdate, {
                        where: {
                            uuid: userUuid
                        },
                        updated_at: new indexUtils_1.Date()
                    })
                        .then(() => {
                        return this.userModel.findAll({
                            attributes: [
                                'uuid',
                                'name',
                                'email',
                                'password',
                                'isAdmin',
                                ['created_at', 'createdAt'],
                                ['updated_at', 'updatedAt']
                            ],
                            where: {
                                uuid: userUuid
                            }
                        });
                    });
                    response = userUpdated;
                }
                this.logger.info('[UserRepository][update] -> end.');
                return response;
            }
            catch (error) {
                this.logger.error(`[UserRepository][update] -> ${error}`);
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteUser(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info(`[UserRepository][delete][${userUuid}] -> starting...`);
                let result;
                console.log('user uuid; ', userUuid);
                if (userUuid !== null || userUuid !== undefined) {
                    const userDeleted = yield this.userModel
                        .destroy({
                        where: {
                            uuid: userUuid
                        }
                    })
                        .then(() => {
                        return this.userModel.findAll({ where: { uuid: userUuid } });
                    });
                    if (userDeleted.length === 0) {
                        result = true;
                        this.logger.info(`[UserRepository][delete] [${userUuid}] -> end.`);
                    }
                    else {
                        result = false;
                        this.logger.info('[UserRepository][delete] user doesnt exist -> end.');
                    }
                }
                else {
                    result = null;
                }
                return result;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.default = UserRepository;
