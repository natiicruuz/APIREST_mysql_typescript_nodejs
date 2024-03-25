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
exports.AgencyController = void 0;
class AgencyController {
    constructor(agencyAction, logger, exception, responseFormat) {
        this.agencyAction = agencyAction;
        this.logger = logger;
        this.exception = exception;
        this.responseFormat = responseFormat;
        this.getAgency = this.getAgency.bind(this);
        this.createAgency = this.createAgency.bind(this);
        this.updateAgency = this.updateAgency.bind(this);
        this.deleteAgency = this.deleteAgency.bind(this);
    }
    getAgency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.agencyAction.getAgency();
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
    createAgency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[AgencyController][createAgency] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const { name, model, year } = req.body;
                const agency = { name, model, year };
                const newAgency = yield this.agencyAction.createAgency(agency);
                let result;
                if (newAgency === null) {
                    result = null;
                    res
                        .status(404)
                        .send('Error: agency was not created, please insert valid inputs.');
                }
                result = yield this.responseFormat.run(newAgency, protocol, host, path, 200);
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateAgency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[AgencyController][updateAgency] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const uuid = req.params.uuid;
                const agency = Object.assign({}, req.body);
                const agencyUpdated = yield this.agencyAction.updateAgency(uuid, agency);
                let result;
                if (agencyUpdated === null) {
                    result = yield this.responseFormat.run(['Agency has not been updated.'], protocol, host, path, 404);
                    res.status(404);
                }
                else {
                    result = yield this.responseFormat.run(['Agency has been updated successfully.'], protocol, host, path, 200);
                    res.status(200);
                }
                this.logger.info('[AgencyController][update] -> end.');
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteAgency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[AgencyController][deleteAgency] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const uuid = req.params.uuid;
                const agencyDeleted = yield this.agencyAction.deleteAgency(uuid);
                let result;
                if (agencyDeleted === null) {
                    result = yield this.responseFormat.run(['Agency has not been deleted.'], protocol, host, path, 404);
                    res.status(404);
                }
                else {
                    result = yield this.responseFormat.run(['Agency has been deleted successfully.'], protocol, host, path, 200);
                    res.status(200);
                }
                this.logger.info('[AgencyController][delete] -> end.');
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.AgencyController = AgencyController;
