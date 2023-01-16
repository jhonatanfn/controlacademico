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
exports.nombreRepetidoEditar = exports.nombreRepetido = exports.tieneAulas = exports.deleteGrado = exports.putGrado = exports.postGrado = exports.getGrado = exports.getGrados = exports.getTodo = exports.busquedaGrados = void 0;
const grado_1 = __importDefault(require("../models/grado"));
const sequelize_1 = require("sequelize");
const aula_1 = __importDefault(require("../models/aula"));
const handleError_1 = require("../utils/handleError");
const busquedaGrados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield grado_1.default.findAll({
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
exports.busquedaGrados = busquedaGrados;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grados = yield grado_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            grados
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getGrados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield grado_1.default.findAll({
            where: { estado: true }
        })).length;
        const grados = yield grado_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
        });
        res.json({
            ok: true,
            grados,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getGrados = getGrados;
const getGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const grado = yield grado_1.default.findByPk(id);
        if (!grado) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un grado con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            grado
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getGrado = getGrado;
const postGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const grado = grado_1.default.build(body);
        yield grado.save();
        res.json({
            ok: true,
            msg: 'Grado creado exitosamente',
            grado
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postGrado = postGrado;
const putGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const grado = yield grado_1.default.findByPk(id);
        if (!grado) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un grado con el id: ${id}`
            });
        }
        yield (grado === null || grado === void 0 ? void 0 : grado.update(body));
        res.json({
            ok: true,
            msg: 'Grado actualizado exitosamente',
            grado
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putGrado = putGrado;
const deleteGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const grado = yield grado_1.default.findByPk(id);
        if (!grado) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un grado con el id: ${id}`
            });
        }
        yield (grado === null || grado === void 0 ? void 0 : grado.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Grado eliminado exitosamente',
            grado
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteGrado = deleteGrado;
const tieneAulas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gradoId } = req.params;
    try {
        const aulas = yield aula_1.default.findAll({
            where: {
                estado: true,
                gradoId: gradoId
            }
        });
        if (aulas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el grado."
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
    const { gradoNombre } = req.params;
    try {
        const grado = yield grado_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${gradoNombre}%`
                }
            },
            attributes: ['id']
        });
        if (grado) {
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
    const { gradoId, gradoNombre } = req.params;
    try {
        const grado = yield grado_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${gradoNombre}%`
                },
                id: {
                    [sequelize_1.Op.ne]: gradoId
                }
            },
            attributes: ['id']
        });
        if (grado) {
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
//# sourceMappingURL=grado.js.map