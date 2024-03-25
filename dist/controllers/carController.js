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
exports.CarController = void 0;
class CarController {
    constructor(carAction, logger, exception, responseFormat) {
        this.carAction = carAction;
        this.logger = logger;
        this.exception = exception;
        this.responseFormat = responseFormat;
        this.getCar = this.getCar.bind(this);
        this.createCar = this.createCar.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }
    getCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.carAction.getCar();
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
    createCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[CarController][createCar] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const { name, model, year } = req.body;
                const car = { name, model, year };
                const newCar = yield this.carAction.createCar(car);
                let result;
                if (newCar === null) {
                    result = null;
                    res.status(404).send('Error: car was not created, please insert valid inputs.');
                }
                result = yield this.responseFormat.run(newCar, protocol, host, path, 200);
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[CarController][updateCar] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const uuid = req.params.uuid;
                const car = Object.assign({}, req.body);
                const carUpdated = yield this.carAction.updateCar(uuid, car);
                let result;
                if (carUpdated === null) {
                    result = yield this.responseFormat.run(['Car has not been updated.'], protocol, host, path, 404);
                    res.status(404);
                }
                else {
                    result = yield this.responseFormat.run(['Car has been updated successfully.'], protocol, host, path, 200);
                    res.status(200);
                }
                this.logger.info('[CarController][update] -> end.');
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info('[CarController][deleteCar] -> starting...');
                const protocol = req.protocol;
                const host = (_a = req.get('host')) !== null && _a !== void 0 ? _a : '/';
                const path = req.path;
                const uuid = req.params.uuid;
                const carDeleted = yield this.carAction.deleteCar(uuid);
                let result;
                if (carDeleted === null) {
                    result = yield this.responseFormat.run(['Car has not been deleted.'], protocol, host, path, 404);
                    res.status(404);
                }
                else {
                    result = yield this.responseFormat.run(['Car has been deleted successfully.'], protocol, host, path, 200);
                    res.status(200);
                }
                this.logger.info('[CarController][delete] -> end.');
                res.json(result);
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.CarController = CarController;
