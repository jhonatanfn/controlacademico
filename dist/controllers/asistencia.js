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
exports.getAsistenciasHoy = exports.getAsistenciasPeriodoAulaAreaSubareaCicloAlumno = exports.getAsistenciasPeriodoAulaAreaSubarea = exports.getAsistenciasPeriodoAulaArea = exports.getAsistenciasPeriodoAula = exports.getAsistenciasPeriodo = exports.getAsistenciasRangoApoderado = exports.getAsistenciasPeriodoAulaSubareaFechaApoderado = exports.getAsistenciasRangoMatricula = exports.getAsistenciasRango = exports.asistenciasPorMatriculaRango = exports.getAsistenciasPeriodoAulaSubareaFecha = exports.existeAsistenciaProgramacionFecha = exports.asistenciasPorMatricula = exports.getAsistenciasProgramacionFecha = exports.deleteAsistencia = exports.putAsistencia = exports.postAsistencia = exports.getAsistencia = exports.getAsistencias = exports.getTodo = void 0;
const alumno_1 = __importDefault(require("../models/alumno"));
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("../models/area"));
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
const subarea_1 = __importDefault(require("../models/subarea"));
const apoderado_1 = __importDefault(require("../models/apoderado"));
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getTodo = getTodo;
const getAsistencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield asistencia_1.default.findAll({
            where: { estado: true }
        })).length;
        const asistencias = yield asistencia_1.default.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [{
                    model: matricula_1.default,
                    as: 'matricula',
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        },
                        {
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
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistencias = getAsistencias;
const getAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const asistencia = yield asistencia_1.default.findByPk(id, {
            include: [{
                    model: matricula_1.default,
                    as: 'matricula',
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
                                }
                            ]
                        },
                        {
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
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
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
                }
            ],
        });
        if (!asistencia || asistencia.estado == false) {
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.deleteAsistencia = deleteAsistencia;
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
const getAsistenciasRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
exports.getAsistenciasRango = getAsistenciasRango;
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: apoderado_1.default,
                                    as: 'apoderado',
                                    attributes: ['id']
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: apoderado_1.default,
                                    as: 'apoderado',
                                    attributes: ['id']
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
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
const getAsistenciasPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodo = getAsistenciasPeriodo;
const getAsistenciasPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
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
                                    attributes: ['id', 'nombre'],
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodoAula = getAsistenciasPeriodoAula;
const getAsistenciasPeriodoAulaArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
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
                                    attributes: ['id', 'nombre'],
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
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodoAulaArea = getAsistenciasPeriodoAulaArea;
const getAsistenciasPeriodoAulaAreaSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, subareaId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodoAulaAreaSubarea = getAsistenciasPeriodoAulaAreaSubarea;
const getAsistenciasPeriodoAulaAreaSubareaCicloAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, subareaId, alumnoId } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
                matriculaId: alumnoId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: situacion_1.default,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'personaId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasPeriodoAulaAreaSubareaCicloAlumno = getAsistenciasPeriodoAulaAreaSubareaCicloAlumno;
const getAsistenciasHoy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, fecha } = req.params;
    try {
        const asistencias = yield asistencia_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
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
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getAsistenciasHoy = getAsistenciasHoy;
//# sourceMappingURL=asistencia.js.map