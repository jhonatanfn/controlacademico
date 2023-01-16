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
exports.tieneHorarios = exports.busquedaHoras = exports.deleteHora = exports.putHora = exports.postHora = exports.getHora = exports.getHoras = exports.getTodo = void 0;
const hora_1 = __importDefault(require("../models/hora"));
const sequelize_1 = require("sequelize");
const horario_1 = __importDefault(require("../models/horario"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const horas = yield hora_1.default.findAll({
            where: { estado: true },
            attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo', 'estado']
        });
        res.json({
            ok: true,
            horas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getHoras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield hora_1.default.findAll({
            where: { estado: true }
        })).length;
        const horas = yield hora_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo', 'estado']
        });
        res.json({
            ok: true,
            horas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getHoras = getHoras;
const getHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const hora = yield hora_1.default.findByPk(id);
        if (!hora) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una hora con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            hora
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getHora = getHora;
const postHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const hora = hora_1.default.build(body);
        yield hora.save();
        res.json({
            ok: true,
            msg: 'Hora creada exitosamente',
            hora
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postHora = postHora;
const putHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const hora = yield hora_1.default.findByPk(id);
        if (!hora) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una hora con el id: ${id}`
            });
        }
        yield (hora === null || hora === void 0 ? void 0 : hora.update(body));
        res.json({
            ok: true,
            msg: 'Hora actualizada exitosamente',
            hora
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putHora = putHora;
const deleteHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const hora = yield hora_1.default.findByPk(id);
        if (!hora) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una hora con el id: ${id}`
            });
        }
        yield (hora === null || hora === void 0 ? void 0 : hora.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Hora eliminada exitosamente',
            hora
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteHora = deleteHora;
const busquedaHoras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield hora_1.default.findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo', 'estado']
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
exports.busquedaHoras = busquedaHoras;
const tieneHorarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { horaId } = req.params;
    try {
        const horarios = yield horario_1.default.findAll({
            where: {
                estado: true,
                horaId: horaId
            }
        });
        if (horarios.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la hora."
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
exports.tieneHorarios = tieneHorarios;
//# sourceMappingURL=hora.js.map