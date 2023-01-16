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
exports.getAsistenciasRangoApoderado = exports.getAsistenciasPeriodoAulaSubareaFechaApoderado = exports.getAsistenciasRangoMatricula = exports.asistenciasPorMatriculaRango = exports.getAsistenciasPeriodoAulaSubareaFecha = exports.existeAsistenciaProgramacionFecha = exports.asistenciasPorMatricula = exports.getAsistenciasProgramacionFecha = exports.getAsistenciasRango = exports.getAsistenciasPeriodoAulaRangoAlumno = exports.getAsistenciasPeriodoAulaRango = exports.getAsistenciasPeriodoAula = exports.getAsistenciasPeriodo = exports.getAsistenciasAlumno = exports.getAsistenciasHoy = exports.listadoAsistencias = exports.existeAsistencia = exports.deleteAsistencia = exports.putAsistencia = exports.postAsistencia = exports.getAsistencia = exports.getAsistencias = exports.getTodo = void 0;
const alumno_1 = __importDefault(require("../models/alumno"));
const sequelize_1 = require("sequelize");
const asistencia_1 = __importDefault(require("../models/asistencia"));
const aula_1 = __importDefault(require("../models/aula"));
const docente_1 = __importDefault(require("../models/docente"));
const grado_1 = __importDefault(require("../models/grado"));
const matricula_1 = __importDefault(require("../models/matricula"));
const nivel_1 = __importDefault(require("../models/nivel"));
const periodo_1 = __importDefault(require("../models/periodo"));
const persona_1 = __importDefault(require("../models/persona"));
const programacion_1 = __importDefault(require("../models/programacion"));
const seccion_1 = __importDefault(require("../models/seccion"));
const situacion_1 = __importDefault(require("../models/situacion"));
const matriculadetalle_1 = __importDefault(require("../models/matriculadetalle"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getAsistencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield asistencia_1.default.findAll({
            where: {
                estado: true
            }
        })).length;
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: alumno_1.default,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                }
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                }
            ],
        });
        res.json({
            ok: true,
            asistencias,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistencias = getAsistencias;
const getAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const asistencia = yield asistencia_1.default.findOne({
            where: {
                estado: true
            },
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: alumno_1.default,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                }
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                }
            ]
        });
        if (!asistencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asistencia con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            asistencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistencia = getAsistencia;
const postAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const asistencia = asistencia_1.default.build(body);
        yield asistencia.save();
        res.json({
            ok: true,
            msg: 'Asistencia guardada exitosamente',
            asistencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postAsistencia = postAsistencia;
const putAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const asistencia = yield asistencia_1.default.findByPk(id);
        if (!asistencia || asistencia.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un asistencia con el id: ${id}`
            });
        }
        yield (asistencia === null || asistencia === void 0 ? void 0 : asistencia.update(body));
        res.json({
            ok: true,
            msg: 'Asistencia actualizada exitosamente',
            asistencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putAsistencia = putAsistencia;
const deleteAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const asistencia = yield asistencia_1.default.findByPk(id);
        if (!asistencia || asistencia.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asistencia con el id: ${id}`
            });
        }
        yield (asistencia === null || asistencia === void 0 ? void 0 : asistencia.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Asistencia eliminada exitosamente',
            asistencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteAsistencia = deleteAsistencia;
const existeAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                fecha: fecha,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id']
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (asistencias.length > 0) {
            return res.json({
                ok: true,
                msg: 'Ya existe asistencia registrada para esta fecha'
            });
        }
        res.json({
            ok: false,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.existeAsistencia = existeAsistencia;
const listadoAsistencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                fecha: fecha,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'matriculadetalleId', 'situacionId', 'fecha', 'hora', 'observacion'],
            order: [
                [
                    { model: matriculadetalle_1.default, as: 'matriculadetalle' },
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: alumno_1.default,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id']
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.listadoAsistencias = listadoAsistencias;
const getAsistenciasHoy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                fecha: fecha
            },
            attributes: ['id', 'fecha'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal']
                                },
                            ]
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasHoy = getAsistenciasHoy;
const getAsistenciasAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, alumnoId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                }
            },
            attributes: ['id', 'fecha', 'hora', 'observacion'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        },
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: alumno_1.default,
                                    as: 'alumno',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasAlumno = getAsistenciasAlumno;
const getAsistenciasPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasPeriodo = getAsistenciasPeriodo;
const getAsistenciasPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                },
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasPeriodoAula = getAsistenciasPeriodoAula;
const getAsistenciasPeriodoAulaRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                }
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre']
                                },
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasPeriodoAulaRango = getAsistenciasPeriodoAulaRango;
const getAsistenciasPeriodoAulaRangoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, fechainicial, fechafinal, alumnoId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                }
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: alumno_1.default,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasPeriodoAulaRangoAlumno = getAsistenciasPeriodoAulaRangoAlumno;
const getAsistenciasRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                }
            },
            order: [
                [
                    { model: matriculadetalle_1.default, as: 'matriculadetalle' },
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: alumno_1.default,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAsistenciasRango = getAsistenciasRango;
const getAsistenciasProgramacionFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.id$': programacionId,
                fecha: fecha
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            include: [
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
                                            as: 'persona',
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo'
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasProgramacionFecha = getAsistenciasProgramacionFecha;
const asistenciasPorMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, fechainicial } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                matriculaId: id,
                fecha: fechainicial
            },
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            include: [
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
                                            as: 'persona',
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo'
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.asistenciasPorMatricula = asistenciasPorMatricula;
const existeAsistenciaProgramacionFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                fecha: fecha,
                '$matricula.programacion.id$': programacionId
            },
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion'
                        }
                    ]
                }
            ]
        });
        if (asistencias.length > 0) {
            return res.json({
                ok: true,
                msg: 'Ya existe asistencia registrada para esta fecha'
            });
        }
        res.json({
            ok: false,
            msg: ''
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.existeAsistenciaProgramacionFecha = existeAsistenciaProgramacionFecha;
const getAsistenciasPeriodoAulaSubareaFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                fecha: fecha
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodoAulaSubareaFecha = getAsistenciasPeriodoAulaSubareaFecha;
const asistenciasPorMatriculaRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                matriculaId: matriculaId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                }
            },
            order: [
                ['fecha', 'ASC']
            ],
            attributes: ['id', 'fecha', 'hora', 'matriculaId', 'situacionId'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.asistenciasPorMatriculaRango = asistenciasPorMatriculaRango;
const getAsistenciasRangoMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, matriculaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                '$matricula.id$': matriculaId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                }
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasRangoMatricula = getAsistenciasRangoMatricula;
const getAsistenciasPeriodoAulaSubareaFechaApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, fecha, apoderadoId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                fecha: fecha,
                '$matricula.alumno.apoderado.id$': apoderadoId,
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                },
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodoAulaSubareaFechaApoderado = getAsistenciasPeriodoAulaSubareaFechaApoderado;
const getAsistenciasRangoApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, fechainicial, fechafinal, apoderadoId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                fecha: {
                    [sequelize_1.Op.between]: [fechainicial, fechafinal]
                },
                '$matricula.alumno.apoderado.id$': apoderadoId,
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                },
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                            ]
                        }
                    ]
                },
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasRangoApoderado = getAsistenciasRangoApoderado;
//# sourceMappingURL=asistencia.js.map