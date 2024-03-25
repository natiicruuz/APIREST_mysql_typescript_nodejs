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
exports.AgencyActions = void 0;
class AgencyActions {
    constructor(agencyRepository, logger, exception, uuidGenerator) {
        this.agencyRepository = agencyRepository;
        this.logger = logger;
        this.exception = exception;
        this.uuidGenerator = uuidGenerator;
    }
    getAgency() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.agencyRepository.getAgency();
            return result;
        });
    }
    createAgency(agency) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[AgencyAction][create] -> starting...');
                let newAgency;
                if (agency === null || agency === undefined || Object.keys(agency).length === 0) {
                    newAgency = null;
                }
                else {
                    const uuidCategory = this.uuidGenerator.generate();
                    agency.uuid = uuidCategory;
                    newAgency = yield this.agencyRepository.createAgency(agency);
                }
                this.logger.info('[AgencyAction][create] -> end.');
                return newAgency;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateAgency(uuid, agency) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[AgencyAction][update] -> starting...');
                let agencyUpdated;
                console.log(uuid);
                if ((uuid !== null || uuid !== undefined) &&
                    (agency !== null || agency !== undefined)) {
                    agencyUpdated = yield this.agencyRepository.updateAgency(uuid, agency);
                }
                else {
                    agencyUpdated = null;
                }
                this.logger.info('[AgencyAction][update] -> end.');
                return agencyUpdated;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteAgency(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[AgencyAction][delete] -> starting...');
                let agencyDeleted;
                if (uuid === null || uuid === undefined) {
                    agencyDeleted = null;
                }
                else {
                    agencyDeleted = yield this.agencyRepository.deleteAgency(uuid);
                }
                this.logger.info('[AgencyAction][delete] -> end.');
                console.log('agency deleted: ', agencyDeleted);
                return agencyDeleted;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.AgencyActions = AgencyActions;
