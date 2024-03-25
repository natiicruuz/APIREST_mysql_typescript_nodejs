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
exports.ResponseFormat = void 0;
class ResponseFormat {
    constructor() { }
    static callResponseFormat() {
        ResponseFormat.instance = new ResponseFormat();
        return ResponseFormat.instance;
    }
    run(data, protocol, host, path, statusCode, paginator, isGetAll) {
        return __awaiter(this, void 0, void 0, function* () {
            let users;
            if (isGetAll === true) {
                users = {
                    statusCode,
                    body: {
                        _links: {
                            self: `${protocol}://${host}${path}`
                        },
                        _embedded: {
                            detail: data
                        },
                        pagination: paginator !== null && paginator !== void 0 ? paginator : {
                            total: 0,
                            perPage: 0,
                            currentPage: 0,
                            totalPages: 0
                        }
                    }
                };
            }
            users = {
                statusCode,
                body: {
                    _links: {
                        self: `${protocol}://${host}${path}`
                    },
                    _embedded: {
                        detail: data
                    }
                }
            };
            return users;
        });
    }
}
exports.ResponseFormat = ResponseFormat;
