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
class CarRepository {
    constructor(carModel, logger, exception) {
        this.carModel = carModel;
        this.logger = logger;
        this.exception = exception;
    }
    getCar() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.carModel.findAll();
            return result;
        });
    }
    createCar(carCreation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[CarRepository][create] -> starting...');
                const { uuid, name, model, year } = carCreation;
                const result = yield this.carModel.create({
                    uuid,
                    name,
                    model,
                    year
                });
                this.logger.info('[CarRepository][create] -> end.');
                return result;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateCar(carUuid, carUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[CarRepository][update] -> starting...');
                let response;
                if (carUuid === null || carUuid === undefined) {
                    response = null;
                }
                else {
                    const carUpdated = yield this.carModel.update(carUpdate, {
                        where: {
                            uuid: carUuid
                        },
                        updated_at: new indexUtils_1.Date()
                    })
                        .then(() => {
                        return this.carModel.findAll({
                            attributes: ['uuid', 'name', 'model', 'year', ['created_at', 'createdAt'], ['updated_at', 'updatedAt']],
                            where: {
                                uuid: carUuid
                            }
                        });
                    });
                    response = carUpdated;
                }
                this.logger.info('[CarRepository][update] -> end.');
                return response;
            }
            catch (error) {
                this.logger.error(`[CarRepository][update] -> ${error}`);
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteCar(carUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info(`[CarRepository][delete][${carUuid}] -> starting...`);
                let result;
                console.log('car uuid; ', carUuid);
                if (carUuid !== null || carUuid !== undefined) {
                    const carDeleted = yield this.carModel.destroy({
                        where: {
                            uuid: carUuid
                        }
                    })
                        .then(() => {
                        return this.carModel.findAll({ where: { uuid: carUuid } });
                    });
                    if (carDeleted.length === 0) {
                        result = true;
                        this.logger.info(`[CarRepository][delete] [${carUuid}] -> end.`);
                    }
                    else {
                        result = false;
                        this.logger.info('[CarRepository][delete] car doesnt exist -> end.');
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
exports.default = CarRepository;
