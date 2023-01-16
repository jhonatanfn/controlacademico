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
exports.existeAulaEditar = exports.existeAula = exports.busquedaAulasTotal = exports.tieneProgramaciones = exports.busquedaAulas = exports.deleteAula = exports.putAula = exports.postAula = exports.getAula = exports.getAulaPorNivelGradoSeccion = exports.getAulas = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const aula_1 = __importDefault(require("../models/aula"));
const grado_1 = __importDefault(require("../models/grado"));
const nivel_1 = __importDefault(require("../models/nivel"));
const programacion_1 = __importDefault(require("../models/programacion"));
const seccion_1 = __importDefault(require("../models/seccion"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aulas = yield aula_1.default.findAll({
            where: { estado: true },
            attributes: ['id', 'nombre', 'tipovalor'],
            include: [
                {
                    model: nivel_1.default,
                    as: 'nivel',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: grado_1.default,
                    as: 'grado',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: seccion_1.default,
                    as: 'seccion',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            aulas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getAulas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield aula_1.default.findAll({
            where: { estado: true }
        })).length;
        const aulas = yield aula_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'nombre', 'tipovalor'],
            include: [
                {
                    model: nivel_1.default,
                    as: 'nivel',
                    attributes: ['id', 'nombre'],
                    required: false
                },
                {
                    model: grado_1.default,
                    as: 'grado',
                    attributes: ['id', 'nombre'],
                    required: false
                },
                {
                    model: seccion_1.default,
                    as: 'seccion',
                    attributes: ['id', 'nombre'],
                    required: false
                }
            ]
        });
        res.json({
            ok: true,
            aulas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAulas = getAulas;
const getAulaPorNivelGradoSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nivel, grado, seccion } = req.params;
    try {
        const aula = yield aula_1.default.findOne({
            where: {
                estado: true,
                nivelId: nivel,
                gradoId: grado,
                seccionId: seccion
            },
            include: [
                {
                    model: nivel_1.default,
                    as: 'nivel',
                    attributes: ['id', 'nombre', 'tipovalor'],
                    required: false
                },
                {
                    model: grado_1.default,
                    as: 'grado',
                    attributes: ['id', 'nombre'],
                    required: false
                },
                {
                    model: seccion_1.default,
                    as: 'seccion',
                    attributes: ['id', 'nombre'],
                    required: false
                }
            ]
        });
        if (!aula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una aula con esos parametros`
            });
        }
        res.json({
            ok: true,
            aula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAulaPorNivelGradoSeccion = getAulaPorNivelGradoSeccion;
const getAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const aula = yield aula_1.default.findByPk(id, {
            attributes: ['id', 'nombre', 'tipovalor'],
            include: [
                {
                    model: nivel_1.default,
                    as: 'nivel',
                    attributes: ['id', 'nombre'],
                    required: false
                },
                {
                    model: grado_1.default,
                    as: 'grado',
                    attributes: ['id', 'nombre'],
                    required: false
                },
                {
                    model: seccion_1.default,
                    as: 'seccion',
                    attributes: ['id', 'nombre'],
                    required: false
                }
            ]
        });
        if (!aula || aula.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una aula con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            aula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAula = getAula;
const postAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const aula = aula_1.default.build(body);
        yield aula.save();
        res.json({
            ok: true,
            msg: 'Aula creada exitosamente',
            aula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postAula = postAula;
const putAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const aula = yield aula_1.default.findByPk(id);
        if (!aula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un aula con el id: ${id}`
            });
        }
        yield (aula === null || aula === void 0 ? void 0 : aula.update(body));
        res.json({
            ok: true,
            msg: 'Aula actualizada exitosamente',
            aula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putAula = putAula;
const deleteAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const aula = yield aula_1.default.findByPk(id);
        if (!aula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un aula con el id: ${id}`
            });
        }
        yield (aula === null || aula === void 0 ? void 0 : aula.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Aula eliminada exitosamente',
            aula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteAula = deleteAula;
const busquedaAulas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield aula_1.default.findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: nivel_1.default,
                    as: 'nivel',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: grado_1.default,
                    as: 'grado',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: seccion_1.default,
                    as: 'seccion',
                    attributes: ['id', 'nombre'],
                }
            ]
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
exports.busquedaAulas = busquedaAulas;
const tieneProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { aulaId } = req.params;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                aulaId: aulaId
            }
        });
        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el aula."
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
const busquedaAulasTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield aula_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$nivel.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$grado.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$seccion.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        nombre: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: nivel_1.default,
                    as: 'nivel',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: grado_1.default,
                    as: 'grado',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: seccion_1.default,
                    as: 'seccion',
                    attributes: ['id', 'nombre'],
                }
            ]
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
exports.busquedaAulasTotal = busquedaAulasTotal;
const existeAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aula = yield aula_1.default.findOne({
            where: {
                nivelId: req.params.nivelId,
                gradoId: req.params.gradoId,
                seccionId: req.params.seccionId,
            },
            attributes: ['id'],
        });
        if (aula) {
            return res.json({
                ok: true,
                msg: `Ya existe el aula`
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
exports.existeAula = existeAula;
const existeAulaEditar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aula = yield aula_1.default.findOne({
            where: {
                nivelId: req.params.nivelId,
                gradoId: req.params.gradoId,
                seccionId: req.params.seccionId,
                id: {
                    [sequelize_1.Op.ne]: req.params.idAula
                }
            },
            attributes: ['id'],
        });
        if (aula) {
            return res.json({
                ok: true,
                msg: `Ya existe el aula`
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
exports.existeAulaEditar = existeAulaEditar;
//# sourceMappingURL=aula.js.map