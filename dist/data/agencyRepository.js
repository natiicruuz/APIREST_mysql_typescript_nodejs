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
class AgencyRepository {
    constructor(agencyModel, logger, exception) {
        this.agencyModel = agencyModel;
        this.logger = logger;
        this.exception = exception;
    }
    getAgency() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.agencyModel.findAll();
            return result;
        });
    }
    createAgency(agencyCreation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[AgencyRepository][create] -> starting...');
                const { uuid, name } = agencyCreation;
                const result = yield this.agencyModel.create({ uuid, name });
                this.logger.info('[AgencyRepository][create] -> end.');
                return result;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateAgency(agencyUuid, agencyUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[AgencyRepository][update] -> starting...');
                let response;
                if (agencyUuid === null || agencyUuid === undefined) {
                    response = null;
                }
                else {
                    const agencyUpdated = yield this.agencyModel
                        .update(agencyUpdate, {
                        where: {
                            uuid: agencyUuid
                        },
                        updated_at: new indexUtils_1.Date()
                    })
                        .then(() => {
                        return this.agencyModel.findAll({
                            attributes: [
                                'uuid',
                                'name',
                                ['created_at', 'createdAt'],
                                ['updated_at', 'updatedAt']
                            ],
                            where: {
                                uuid: agencyUuid
                            }
                        });
                    });
                    response = agencyUpdated;
                }
                this.logger.info('[AgencyRepository][update] -> end.');
                return response;
            }
            catch (error) {
                this.logger.error(`[AgencyRepository][update] -> ${error}`);
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteAgency(agencyUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info(`[AgencyRepository][delete][${agencyUuid}] -> starting...`);
                let result;
                console.log('agency uuid; ', agencyUuid);
                if (agencyUuid !== null || agencyUuid !== undefined) {
                    const agencyDeleted = yield this.agencyModel
                        .destroy({
                        where: {
                            uuid: agencyUuid
                        }
                    })
                        .then(() => {
                        return this.agencyModel.findAll({ where: { uuid: agencyUuid } });
                    });
                    if (agencyDeleted.length === 0) {
                        result = true;
                        this.logger.info(`[AgencyRepository][delete] [${agencyUuid}] -> end.`);
                    }
                    else {
                        result = false;
                        this.logger.info('[AgencyRepository][delete] agency doesnt exist -> end.');
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
exports.default = AgencyRepository;
