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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.getEvaluaciones = void 0;
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const handleError_1 = require("../utils/handleError");
const getEvaluaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield evaluacion_1.default.findAll({
            where: { estado: true }
        })).length;
        const evaluaciones = yield evaluacion_1.default.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
        });
        res.json({
            ok: true,
            evaluaciones,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getEvaluaciones = getEvaluaciones;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluaciones = yield evaluacion_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            evaluaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
//# sourceMappingURL=evaluacion.js.map