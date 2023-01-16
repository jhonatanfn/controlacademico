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
exports.getNotasArea = exports.getNotasMatricula = exports.getNotasProgramacionFechaEvaluacionCiclo = exports.existeNotasMatricula = exports.getNotasCicloMatriculadetalle = exports.getNotasPeriodoAulaAlumno = exports.getNotasPeriodoAulaCicloAlumno = exports.getNotasPeriodoAulaAreaCicloAlumno = exports.getNotasPeriodoAulaAreaCiclo = exports.getNotasPeriodoAulaArea = exports.getNotasPeriodoAula = exports.getNotasPeriodo = exports.getNotasMatriculaCicloEvaluacion = exports.getNotasHoyVigesimal = exports.getNotasHoyLiteral = exports.getNotasProgramacionFechaEvaluacionCicloCompetencia = exports.cambiarEstadoNota = exports.deleteNota = exports.putNota = exports.postNota = exports.getNota = exports.getNotas = exports.busquedaNotas = void 0;
const alumno_1 = __importDefault(require("../models/alumno"));
const persona_1 = __importDefault(require("../models/persona"));
const sequelize_1 = require("sequelize");
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const nota_1 = __importDefault(require("../models/nota"));
const matricula_1 = __importDefault(require("../models/matricula"));
const programacion_1 = __importDefault(require("../models/programacion"));
const aula_1 = __importDefault(require("../models/aula"));
const nivel_1 = __importDefault(require("../models/nivel"));
const grado_1 = __importDefault(require("../models/grado"));
const seccion_1 = __importDefault(require("../models/seccion"));
const docente_1 = __importDefault(require("../models/docente"));
const periodo_1 = __importDefault(require("../models/periodo"));
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const ciclo_1 = __importDefault(require("../models/ciclo"));
const matriculadetalle_1 = __importDefault(require("../models/matriculadetalle"));
const competencia_1 = __importDefault(require("../models/competencia"));
const area_1 = __importDefault(require("../models/area"));
const handleError_1 = require("../utils/handleError");
const busquedaNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield nota_1.default.findAll({
            where: {
                '$matricula.alumno.persona.nombres$': {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: true,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            required: true,
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    required: true
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                            required: true,
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
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
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
exports.busquedaNotas = busquedaNotas;
const getNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield nota_1.default.findAll({
            where: { estado: true }
        })).length;
        const notas = yield nota_1.default.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            required: false,
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    include: [
                                        {
                                            model: tipodocumento_1.default,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                            required: false,
                                            include: [
                                                {
                                                    model: tipodocumento_1.default,
                                                    as: 'tipodocumento'
                                                }
                                            ]
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
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            notas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotas = getNotas;
const getNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nota = yield nota_1.default.findByPk(id, {
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            required: false,
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    include: [
                                        {
                                            model: tipodocumento_1.default,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                            required: false,
                                            include: [
                                                {
                                                    model: tipodocumento_1.default,
                                                    as: 'tipodocumento'
                                                }
                                            ]
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
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        if (!nota || nota.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la nota con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            nota
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNota = getNota;
const postNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const nota = nota_1.default.build(body);
        yield nota.save();
        res.json({
            ok: true,
            msg: 'Nota creada exitosamente.',
            nota
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postNota = postNota;
const putNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const nota = yield nota_1.default.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        yield (nota === null || nota === void 0 ? void 0 : nota.update(body));
        res.json({
            ok: true,
            msg: 'Nota actualizada exitosamente',
            nota
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putNota = putNota;
const deleteNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nota = yield nota_1.default.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        yield (nota === null || nota === void 0 ? void 0 : nota.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Nota eliminado exitosamente',
            nota
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteNota = deleteNota;
const cambiarEstadoNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        let msg = "";
        const nota = yield nota_1.default.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        if (body.estado) {
            yield (nota === null || nota === void 0 ? void 0 : nota.update({ estado: false }));
            msg = "Registro eliminado con exito.";
        }
        else {
            yield (nota === null || nota === void 0 ? void 0 : nota.update({ estado: true }));
            msg = "Registro recuperado con exito.";
        }
        res.json({
            ok: true,
            msg: msg,
            nota
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.cambiarEstadoNota = cambiarEstadoNota;
const getNotasProgramacionFechaEvaluacionCicloCompetencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, fecha, evaluacionId, cicloId, competenciaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                evaluacionId: evaluacionId,
                cicloId: cicloId,
                competenciaId: competenciaId,
                '$matriculadetalle.programacion.id$': programacionId,
                fecha: fecha,
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
            attributes: ['id', 'valor', 'fecha', 'hora', 'evaluacionId', 'cicloId', 'matriculadetalleId', 'competenciaId'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
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
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                },
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
                                    attributes: ['id', 'tipovalor']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            notas,
            total: notas.length,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasProgramacionFechaEvaluacionCicloCompetencia = getNotasProgramacionFechaEvaluacionCicloCompetencia;
const getNotasHoyLiteral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, fecha } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.tipovalor$': 1,
                fecha: fecha
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
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
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasHoyLiteral = getNotasHoyLiteral;
const getNotasHoyVigesimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, fecha } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.tipovalor$': 2,
                fecha: fecha
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
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
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasHoyVigesimal = getNotasHoyVigesimal;
const getNotasMatriculaCicloEvaluacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculadetalleId, cicloId, evaluacionId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                matriculadetalleId: matriculadetalleId,
                cicloId: cicloId,
                evaluacionId: evaluacionId
            },
            attributes: ['id', 'valor', 'fecha', 'hora'],
            include: [
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion'],
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasMatriculaCicloEvaluacion = getNotasMatriculaCicloEvaluacion;
const getNotasPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'valor'],
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
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodo = getNotasPeriodo;
const getNotasPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'valor'],
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
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodoAula = getNotasPeriodoAula;
const getNotasPeriodoAulaArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.programacion.area.id$': areaId,
            },
            attributes: ['id', 'valor'],
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
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodoAulaArea = getNotasPeriodoAulaArea;
const getNotasPeriodoAulaAreaCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, cicloId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.programacion.area.id$': areaId,
                cicloId: cicloId,
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
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
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodoAulaAreaCiclo = getNotasPeriodoAulaAreaCiclo;
const getNotasPeriodoAulaAreaCicloAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, cicloId, alumnoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.programacion.area.id$': areaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                cicloId: cicloId,
            },
            attributes: ['id', 'valor', 'fecha'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
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
                                },
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
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodoAulaAreaCicloAlumno = getNotasPeriodoAulaAreaCicloAlumno;
const getNotasPeriodoAulaCicloAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, cicloId, alumnoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                cicloId: cicloId,
            },
            attributes: ['id', 'valor', 'fecha', 'hora'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
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
                                },
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
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodoAulaCicloAlumno = getNotasPeriodoAulaCicloAlumno;
const getNotasPeriodoAulaAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, alumnoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
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
                                },
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
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasPeriodoAulaAlumno = getNotasPeriodoAulaAlumno;
const getNotasCicloMatriculadetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cicloId, matriculadetalleId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                '$matriculadetalle.id$': matriculadetalleId,
                '$ciclo.id$': cicloId
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: ['id', 'valor', 'fecha', 'hora', 'estado'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id']
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasCicloMatriculadetalle = getNotasCicloMatriculadetalle;
const existeNotasMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                '$matriculadetalle.matricula.id$': matriculaId,
            },
            attributes: ['id'],
            include: [
                {
                    model: matriculadetalle_1.default,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: matricula_1.default,
                            as: 'matricula',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });
        if (notas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la matricula."
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
exports.existeNotasMatricula = existeNotasMatricula;
const getNotasProgramacionFechaEvaluacionCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, fecha, evaluacionId, cicloId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                evaluacionId: evaluacionId,
                cicloId: cicloId,
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
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            total: notas.length,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasProgramacionFechaEvaluacionCiclo = getNotasProgramacionFechaEvaluacionCiclo;
const getNotasMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                matriculaId: id
            },
            include: [
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasMatricula = getNotasMatricula;
const getNotasArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, cicloId, alumnoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                cicloId: cicloId,
                '$matricula.alumno.id$': alumnoId,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
            },
            attributes: ['id', 'valor', 'fecha'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'personaId', 'apoderadoId'],
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
                            attributes: ['id', 'aulaId', 'docenteId', 'periodoId', 'subareaId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nivelId', 'gradoId', 'seccionId'],
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
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                            ]
                        }
                    ]
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            notas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getNotasArea = getNotasArea;
//# sourceMappingURL=nota.js.map