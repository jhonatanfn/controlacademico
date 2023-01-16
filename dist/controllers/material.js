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
exports.busquedaMaterialesProgramacion = exports.materialesProgramacion = exports.busquedaMateriales = exports.getMaterialesProgramacion = exports.deleteMaterial = exports.putMaterial = exports.postMaterial = exports.getMaterial = exports.getMateriales = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const aula_1 = __importDefault(require("../models/aula"));
const docente_1 = __importDefault(require("../models/docente"));
const grado_1 = __importDefault(require("../models/grado"));
const material_1 = __importDefault(require("../models/material"));
const nivel_1 = __importDefault(require("../models/nivel"));
const periodo_1 = __importDefault(require("../models/periodo"));
const persona_1 = __importDefault(require("../models/persona"));
const programacion_1 = __importDefault(require("../models/programacion"));
const seccion_1 = __importDefault(require("../models/seccion"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materiales = yield material_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            materiales
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getMateriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield material_1.default.findAll({
            where: { estado: true }
        })).length;
        const materiales = yield material_1.default.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [{
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                        {
                            model: aula_1.default,
                            as: 'aula',
                            include: [
                                {
                                    model: nivel_1.default,
                                    as: 'nivel'
                                },
                                {
                                    model: grado_1.default,
                                    as: 'grado'
                                },
                                {
                                    model: seccion_1.default,
                                    as: 'seccion'
                                }
                            ]
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        }
                    ]
                }],
        });
        res.json({
            ok: true,
            materiales,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMateriales = getMateriales;
const getMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const material = yield material_1.default.findByPk(id, {
            include: [{
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                        {
                            model: aula_1.default,
                            as: 'aula',
                            include: [
                                {
                                    model: nivel_1.default,
                                    as: 'nivel'
                                },
                                {
                                    model: grado_1.default,
                                    as: 'grado'
                                },
                                {
                                    model: seccion_1.default,
                                    as: 'seccion'
                                }
                            ]
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        }
                    ]
                }],
        });
        if (!material || material.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            material
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMaterial = getMaterial;
const postMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const material = material_1.default.build(body);
        yield material.save();
        res.json({
            ok: true,
            msg: 'Material guardado exitosamente',
            material
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postMaterial = postMaterial;
const putMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const material = yield material_1.default.findByPk(id);
        if (!material || material.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        if (!body.archivo) {
            delete body.archivo;
        }
        yield (material === null || material === void 0 ? void 0 : material.update(body));
        res.json({
            ok: true,
            msg: 'Material actualizado exitosamente',
            material
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putMaterial = putMaterial;
const deleteMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const material = yield material_1.default.findByPk(id);
        if (!material || material.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        yield (material === null || material === void 0 ? void 0 : material.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Material eliminado exitosamente',
            material
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteMaterial = deleteMaterial;
const getMaterialesProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacion } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield material_1.default.findAll({
            where: { estado: true, programacionId: programacion }
        })).length;
        const materiales = yield material_1.default.findAll({
            where: {
                estado: true,
                programacionId: programacion
            },
            limit: 6,
            offset: desde,
            include: [{
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                        {
                            model: aula_1.default,
                            as: 'aula',
                            include: [
                                {
                                    model: nivel_1.default,
                                    as: 'nivel'
                                },
                                {
                                    model: grado_1.default,
                                    as: 'grado'
                                },
                                {
                                    model: seccion_1.default,
                                    as: 'seccion'
                                }
                            ]
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        }
                    ]
                }]
        });
        res.json({
            ok: true,
            materiales,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMaterialesProgramacion = getMaterialesProgramacion;
const busquedaMateriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield material_1.default.findAll({
            where: {
                titulo: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [{
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                        {
                            model: aula_1.default,
                            as: 'aula',
                            include: [
                                {
                                    model: nivel_1.default,
                                    as: 'nivel'
                                },
                                {
                                    model: grado_1.default,
                                    as: 'grado'
                                },
                                {
                                    model: seccion_1.default,
                                    as: 'seccion'
                                }
                            ]
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        }
                    ]
                }],
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
exports.busquedaMateriales = busquedaMateriales;
const materialesProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield material_1.default.findAll({
            where: { estado: true, programacionId: programacionId },
        })).length;
        const materiales = yield material_1.default.findAll({
            where: { estado: true, programacionId: programacionId },
            limit: 5,
            offset: desde,
            include: [{
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                        {
                            model: aula_1.default,
                            as: 'aula',
                            include: [
                                {
                                    model: nivel_1.default,
                                    as: 'nivel'
                                },
                                {
                                    model: grado_1.default,
                                    as: 'grado'
                                },
                                {
                                    model: seccion_1.default,
                                    as: 'seccion'
                                }
                            ]
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        }
                    ]
                }],
        });
        res.json({
            ok: true,
            materiales,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.materialesProgramacion = materialesProgramacion;
const busquedaMaterialesProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, programacionId } = req.params;
    try {
        const data = yield material_1.default.findAll({
            where: {
                titulo: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true,
                programacionId: programacionId
            },
            include: [{
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                        {
                            model: aula_1.default,
                            as: 'aula',
                            include: [
                                {
                                    model: nivel_1.default,
                                    as: 'nivel'
                                },
                                {
                                    model: grado_1.default,
                                    as: 'grado'
                                },
                                {
                                    model: seccion_1.default,
                                    as: 'seccion'
                                }
                            ]
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        }
                    ]
                }],
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
exports.busquedaMaterialesProgramacion = busquedaMaterialesProgramacion;
//# sourceMappingURL=material.js.map