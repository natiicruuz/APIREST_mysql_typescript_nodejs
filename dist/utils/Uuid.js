"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
class Uuid {
    constructor(value) {
        if (value !== undefined) {
            if (!this.isValid(value)) {
                throw new Error();
            }
        }
    }
    isValid(value) {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (value === null || value === undefined || value.match(regex) === null) {
            return false;
        }
        return true;
    }
    generate() {
        return (0, uuid_1.v4)();
    }
}
exports.Uuid = Uuid;
