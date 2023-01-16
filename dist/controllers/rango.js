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
exports.busquedaRangos = exports.deleteRango = exports.putRango = exports.postRango = exports.getRango = exports.getRangos = exports.getTodo = void 0;
const rango_1 = __importDefault(require("../models/rango"));
const sequelize_1 = require("sequelize");
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rangos = yield rango_1.default.findAll({
            where: { estado: true },
            attributes: ['id', 'letra', 'inicio', 'fin', 'color', 'alias', 'situacion']
        });
        res.json({
            ok: true,
            rangos
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getRangos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield rango_1.default.findAll({
            where: { estado: true }
        })).length;
        const rangos = yield rango_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'letra', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'letra', 'inicio', 'fin', 'color', 'alias', 'situacion']
        });
        res.json({
            ok: true,
            rangos,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getRangos = getRangos;
const getRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rango = yield rango_1.default.findByPk(id);
        if (!rango) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un rango con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            rango
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getRango = getRango;
const postRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const rango = rango_1.default.build(body);
        yield rango.save();
        res.json({
            ok: true,
            msg: 'Rango creado exitosamente',
            rango
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postRango = postRango;
const putRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const rango = yield rango_1.default.findByPk(id);
        if (!rango) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un rango con el id: ${id}`
            });
        }
        yield (rango === null || rango === void 0 ? void 0 : rango.update(body));
        res.json({
            ok: true,
            msg: 'Rango actualizado exitosamente',
            rango
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putRango = putRango;
const deleteRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rango = yield rango_1.default.findByPk(id);
        if (!rango) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un rango con el id: ${id}`
            });
        }
        yield (rango === null || rango === void 0 ? void 0 : rango.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Rango eliminado exitosamente',
            rango
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteRango = deleteRango;
const busquedaRangos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield rango_1.default.findAll({
            where: {
                letra: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            attributes: ['id', 'letra', 'inicio', 'fin', 'color', 'alias', 'situacion']
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
exports.busquedaRangos = busquedaRangos;
//# sourceMappingURL=rango.js.map