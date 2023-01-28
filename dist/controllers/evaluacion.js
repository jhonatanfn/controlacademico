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
exports.deleteEvaluacion = exports.putEvaluacion = exports.postEvaluacion = exports.getEvaluacion = exports.getTodo = exports.getEvaluaciones = void 0;
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
            attributes: ['id', 'nombre', 'abreviatura', 'estado'],
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
            where: { estado: true },
            attributes: ['id', 'nombre', 'abreviatura', 'estado'],
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
const getEvaluacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const evaluacion = yield evaluacion_1.default.findByPk(id);
        if (!evaluacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una evaluacion con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            evaluacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getEvaluacion = getEvaluacion;
const postEvaluacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const evaluacion = evaluacion_1.default.build(body);
        yield evaluacion.save();
        res.json({
            ok: true,
            msg: 'Evaluacion creada exitosamente',
            evaluacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postEvaluacion = postEvaluacion;
const putEvaluacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const evaluacion = yield evaluacion_1.default.findByPk(id);
        if (!evaluacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una evaluacion con el id: ${id}`
            });
        }
        yield (evaluacion === null || evaluacion === void 0 ? void 0 : evaluacion.update(body));
        res.json({
            ok: true,
            msg: 'Evaluacion actualizada exitosamente',
            evaluacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putEvaluacion = putEvaluacion;
const deleteEvaluacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const evaluacion = yield evaluacion_1.default.findByPk(id);
        if (!evaluacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un evaluacion con el id: ${id}`
            });
        }
        yield (evaluacion === null || evaluacion === void 0 ? void 0 : evaluacion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Evaluacion eliminada exitosamente',
            evaluacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteEvaluacion = deleteEvaluacion;
//# sourceMappingURL=evaluacion.js.map