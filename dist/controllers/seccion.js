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
exports.nombreRepetidoEditar = exports.nombreRepetido = exports.tieneAulas = exports.deleteSeccion = exports.putSeccion = exports.postSeccion = exports.getSeccion = exports.getSecciones = exports.getTodo = exports.busquedaSecciones = void 0;
const seccion_1 = __importDefault(require("../models/seccion"));
const sequelize_1 = require("sequelize");
const aula_1 = __importDefault(require("../models/aula"));
const handleError_1 = require("../utils/handleError");
const busquedaSecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield seccion_1.default.findAll({
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
exports.busquedaSecciones = busquedaSecciones;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secciones = yield seccion_1.default.findAll({
            where: { estado: true },
        });
        res.json({
            ok: true,
            secciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getSecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield seccion_1.default.findAll({
            where: { estado: true }
        })).length;
        const secciones = yield seccion_1.default.findAll({
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
            secciones,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getSecciones = getSecciones;
const getSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const seccion = yield seccion_1.default.findByPk(id);
        if (!seccion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una seccion con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            seccion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getSeccion = getSeccion;
const postSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const seccion = seccion_1.default.build(body);
        yield seccion.save();
        res.json({
            ok: true,
            msg: 'Seccion creado exitosamente',
            seccion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postSeccion = postSeccion;
const putSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const seccion = yield seccion_1.default.findByPk(id);
        if (!seccion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una seccion con el id: ${id}`
            });
        }
        yield (seccion === null || seccion === void 0 ? void 0 : seccion.update(body));
        res.json({
            ok: true,
            msg: 'Seccion actualizada exitosamente',
            seccion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putSeccion = putSeccion;
const deleteSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const seccion = yield seccion_1.default.findByPk(id);
        if (!seccion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una seccion con el id: ${id}`
            });
        }
        yield (seccion === null || seccion === void 0 ? void 0 : seccion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Seccion eliminada exitosamente',
            seccion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteSeccion = deleteSeccion;
const tieneAulas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seccionId } = req.params;
    try {
        const aulas = yield aula_1.default.findAll({
            where: {
                estado: true,
                seccionId: seccionId
            }
        });
        if (aulas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la sección."
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
    const { seccionNombre } = req.params;
    try {
        const seccion = yield seccion_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${seccionNombre}%`
                }
            },
            attributes: ['id']
        });
        if (seccion) {
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
    const { seccionId, seccionNombre } = req.params;
    try {
        const seccion = yield seccion_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${seccionNombre}%`
                },
                id: {
                    [sequelize_1.Op.ne]: seccionId
                }
            },
            attributes: ['id']
        });
        if (seccion) {
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
//# sourceMappingURL=seccion.js.map