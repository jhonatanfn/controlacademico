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
exports.tieneProgramaciones = exports.busquedaPeriodos = exports.deletePeriodo = exports.putPeriodo = exports.postPeriodo = exports.getPeriodoNombre = exports.getPeriodo = exports.getPeriodos = exports.getTodo = void 0;
const periodo_1 = __importDefault(require("../models/periodo"));
const sequelize_1 = require("sequelize");
const programacion_1 = __importDefault(require("../models/programacion"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const periodos = yield periodo_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            periodos
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getPeriodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const periodos = yield periodo_1.default.findAll({
            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
            where: { estado: true }
        });
        res.json({
            ok: true,
            periodos
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPeriodos = getPeriodos;
const getPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const periodo = yield periodo_1.default.findByPk(id);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            periodo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPeriodo = getPeriodo;
const getPeriodoNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const periodo = yield periodo_1.default.findOne({
            where: {
                estado: true,
                nombre: nombre
            },
            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal']
        });
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el nombre: ${nombre}`
            });
        }
        res.json({
            ok: true,
            periodo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPeriodoNombre = getPeriodoNombre;
const postPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const periodo = periodo_1.default.build(body);
        yield periodo.save();
        res.json({
            ok: true,
            msg: 'Periodo creado exitosamente',
            periodo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postPeriodo = postPeriodo;
const putPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const periodo = yield periodo_1.default.findByPk(id);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${id}`
            });
        }
        yield (periodo === null || periodo === void 0 ? void 0 : periodo.update(body));
        res.json({
            ok: true,
            msg: 'Periodo actualizado exitosamente',
            periodo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putPeriodo = putPeriodo;
const deletePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const periodo = yield periodo_1.default.findByPk(id);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${id}`
            });
        }
        yield (periodo === null || periodo === void 0 ? void 0 : periodo.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Periodo eliminado exitosamente',
            periodo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deletePeriodo = deletePeriodo;
const busquedaPeriodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield periodo_1.default.findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            }
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaPeriodos = busquedaPeriodos;
const tieneProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId } = req.params;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                periodoId: periodoId
            }
        });
        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el periodo."
            });
        }
        res.json({
            ok: false
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.tieneProgramaciones = tieneProgramaciones;
//# sourceMappingURL=periodo.js.map