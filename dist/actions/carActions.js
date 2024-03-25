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
exports.CarActions = void 0;
class CarActions {
    constructor(carRepository, logger, exception, uuidGenerator) {
        this.carRepository = carRepository;
        this.logger = logger;
        this.exception = exception;
        this.uuidGenerator = uuidGenerator;
    }
    getCar() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.carRepository.getCar();
            return result;
        });
    }
    createCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[CarAction][create] -> starting...');
                let newCar;
                if (car === null || car === undefined || Object.keys(car).length === 0) {
                    newCar = null;
                }
                else {
                    const uuidCategory = this.uuidGenerator.generate();
                    car.uuid = uuidCategory;
                    newCar = yield this.carRepository.createCar(car);
                }
                this.logger.info('[CarAction][create] -> end.');
                return newCar;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    updateCar(uuid, car) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[CarAction][update] -> starting...');
                let carUpdated;
                console.log(uuid);
                if ((uuid !== null || uuid !== undefined) && (car !== null || car !== undefined)) {
                    carUpdated = yield this.carRepository.updateCar(uuid, car);
                }
                else {
                    carUpdated = null;
                }
                this.logger.info('[CarAction][update] -> end.');
                return carUpdated;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
    deleteCar(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info('[CarAction][delete] -> starting...');
                let carDeleted;
                if (uuid === null || uuid === undefined) {
                    carDeleted = null;
                }
                else {
                    carDeleted = yield this.carRepository.deleteCar(uuid);
                }
                this.logger.info('[CarAction][delete] -> end.');
                console.log('car deleted: ', carDeleted);
                return carDeleted;
            }
            catch (error) {
                throw new Error(yield this.exception.getErrorMessage(error));
            }
        });
    }
}
exports.CarActions = CarActions;
