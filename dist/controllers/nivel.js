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
exports.nombreRepetidoEditar = exports.nombreRepetido = exports.tieneAulas = exports.busquedaNiveles = exports.deleteNivel = exports.putNivel = exports.postNivel = exports.getNivel = exports.getNiveles = exports.getTodo = void 0;
const nivel_1 = __importDefault(require("../models/nivel"));
const aula_1 = __importDefault(require("../models/aula"));
const sequelize_1 = require("sequelize");
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const niveles = yield nivel_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            niveles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getNiveles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield nivel_1.default.findAll({
            where: { estado: true }
        })).length;
        const niveles = yield nivel_1.default.findAll({
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
            niveles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNiveles = getNiveles;
const getNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nivel = yield nivel_1.default.findByPk(id);
        if (!nivel) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un nivel con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            nivel
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNivel = getNivel;
const postNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const nivel = nivel_1.default.build(body);
        yield nivel.save();
        res.json({
            ok: true,
            msg: 'Nivel creado exitosamente',
            nivel
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postNivel = postNivel;
const putNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const nivel = yield nivel_1.default.findByPk(id);
        if (!nivel) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un nivel con el id: ${id}`
            });
        }
        yield (nivel === null || nivel === void 0 ? void 0 : nivel.update(body));
        res.json({
            ok: true,
            msg: 'Nivel actualizado exitosamente',
            nivel
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putNivel = putNivel;
const deleteNivel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nivel = yield nivel_1.default.findByPk(id);
        if (!nivel) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un nivel con el id: ${id}`
            });
        }
        yield (nivel === null || nivel === void 0 ? void 0 : nivel.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Nivel eliminado exitosamente',
            nivel
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteNivel = deleteNivel;
const busquedaNiveles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaNiveles = busquedaNiveles;
const tieneAulas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nivelId } = req.params;
    try {
        const aulas = yield aula_1.default.findAll({
            where: {
                estado: true,
                nivelId: nivelId
            }
        });
        if (aulas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el nivel."
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
exports.tieneAulas = tieneAulas;
const nombreRepetido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nivelNombre } = req.params;
    try {
        const nivel = yield nivel_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${nivelNombre}%`
                }
            },
            attributes: ['id']
        });
        if (nivel) {
            return res.json({
                ok: true
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
exports.nombreRepetido = nombreRepetido;
const nombreRepetidoEditar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nivelId, nivelNombre } = req.params;
    try {
        const nivel = yield nivel_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${nivelNombre}%`
                },
                id: {
                    [sequelize_1.Op.ne]: nivelId
                }
            },
            attributes: ['id']
        });
        if (nivel) {
            return res.json({
                ok: true
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
exports.nombreRepetidoEditar = nombreRepetidoEditar;
//# sourceMappingURL=nivel.js.map