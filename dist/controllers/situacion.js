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
exports.busquedaSituaciones = exports.deleteSituacion = exports.putSituacion = exports.postSituacion = exports.getSituacion = exports.getSituaciones = exports.getTodo = void 0;
const nivel_1 = __importDefault(require("../models/nivel"));
const sequelize_1 = require("sequelize");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const situaciones = yield nivel_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            situaciones
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getTodo = getTodo;
const getSituaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield nivel_1.default.findAll({
            where: { estado: true }
        })).length;
        const situaciones = yield nivel_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
        });
        res.json({
            ok: true,
            situaciones,
            desde,
            total
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getSituaciones = getSituaciones;
const getSituacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const situacion = yield nivel_1.default.findByPk(id);
        if (!situacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la situacion con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            situacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getSituacion = getSituacion;
const postSituacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const situacion = nivel_1.default.build(body);
        yield situacion.save();
        res.json({
            ok: true,
            msg: 'Situacion creada exitosamente',
            situacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.postSituacion = postSituacion;
const putSituacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const situacion = yield nivel_1.default.findByPk(id);
        if (!situacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la situacion con el id: ${id}`
            });
        }
        yield (situacion === null || situacion === void 0 ? void 0 : situacion.update(body));
        res.json({
            ok: true,
            msg: 'Situacion actualizado exitosamente',
            situacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.putSituacion = putSituacion;
const deleteSituacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const situacion = yield nivel_1.default.findByPk(id);
        if (!situacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una situacion con el id: ${id}`
            });
        }
        yield (situacion === null || situacion === void 0 ? void 0 : situacion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Situacion eliminada exitosamente',
            situacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.deleteSituacion = deleteSituacion;
const busquedaSituaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield nivel_1.default.findAll({
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaSituaciones = busquedaSituaciones;
//# sourceMappingURL=situacion.js.map