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
exports.getApreciaciondetallesApreciacion = exports.getApreciaciondetallesPeriodoAlumno = exports.busquedaApreciaciondetalles = exports.deleteApreciaciondetalle = exports.putApreciaciondetalle = exports.postApreciaciondetalle = exports.getApreciaciondetalle = exports.getApreciaciondetalles = exports.getTodo = void 0;
const apreciaciondetalle_1 = __importDefault(require("../models/apreciaciondetalle"));
const sequelize_1 = require("sequelize");
const apreciacion_1 = __importDefault(require("../models/apreciacion"));
const periodo_1 = __importDefault(require("../models/periodo"));
const alumno_1 = __importDefault(require("../models/alumno"));
const persona_1 = __importDefault(require("../models/persona"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apreciaciondetalles = yield apreciaciondetalle_1.default.findAll({
            where: { estado: true },
            include: [
                {
                    model: apreciacion_1.default,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciondetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getApreciaciondetalles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield apreciaciondetalle_1.default.findAll({
            where: { estado: true }
        })).length;
        const niveles = yield apreciaciondetalle_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: apreciacion_1.default,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
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
exports.getApreciaciondetalles = getApreciaciondetalles;
const getApreciaciondetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apreciaciondetalle = yield apreciaciondetalle_1.default.findByPk(id);
        if (!apreciaciondetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciaciondetalle con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            apreciaciondetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getApreciaciondetalle = getApreciaciondetalle;
const postApreciaciondetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const apreciaciondetalle = apreciaciondetalle_1.default.build(body);
        yield apreciaciondetalle.save();
        res.json({
            ok: true,
            msg: 'Apreciaciondetalle creada exitosamente',
            apreciaciondetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postApreciaciondetalle = postApreciaciondetalle;
const putApreciaciondetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const apreciaciondetalle = yield apreciaciondetalle_1.default.findByPk(id);
        if (!apreciaciondetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciaciondetalle con el id: ${id}`
            });
        }
        yield (apreciaciondetalle === null || apreciaciondetalle === void 0 ? void 0 : apreciaciondetalle.update(body));
        res.json({
            ok: true,
            msg: 'Apreciaciondetalle actualizado exitosamente',
            apreciaciondetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putApreciaciondetalle = putApreciaciondetalle;
const deleteApreciaciondetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apreciaciondetalle = yield apreciaciondetalle_1.default.findByPk(id);
        if (!apreciaciondetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciaciondetalle con el id: ${id}`
            });
        }
        yield (apreciaciondetalle === null || apreciaciondetalle === void 0 ? void 0 : apreciaciondetalle.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Apreciaciondetalle eliminada exitosamente',
            apreciaciondetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteApreciaciondetalle = deleteApreciaciondetalle;
const busquedaApreciaciondetalles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield apreciaciondetalle_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$apreciacion.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$apreciacion.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$apreciacion.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: apreciacion_1.default,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
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
exports.busquedaApreciaciondetalles = busquedaApreciaciondetalles;
const getApreciaciondetallesPeriodoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apreciaciondetalles = yield apreciaciondetalle_1.default.findAll({
            where: {
                estado: true,
                '$apreciacion.periodo.id$': req.params.periodoId,
                '$apreciacion.alumno.id$': req.params.alumnoId,
                '$apreciacion.estado$': true
            },
            order: [
                ['nombre', 'ASC']
            ],
            include: [
                {
                    model: apreciacion_1.default,
                    as: 'apreciacion',
                    attributes: ['id', 'estado'],
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciondetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getApreciaciondetallesPeriodoAlumno = getApreciaciondetallesPeriodoAlumno;
const getApreciaciondetallesApreciacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apreciaciondetalles = yield apreciaciondetalle_1.default.findAll({
            where: {
                estado: true,
                apreciacionId: req.params.apreciacionId
            },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            attributes: ['id', 'nombre', 'descripcion', 'responsabilidad', 'firma'],
            include: [
                {
                    model: apreciacion_1.default,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciondetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getApreciaciondetallesApreciacion = getApreciaciondetallesApreciacion;
//# sourceMappingURL=apreciaciondetalle.js.map