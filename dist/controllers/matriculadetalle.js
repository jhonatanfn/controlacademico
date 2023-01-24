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
exports.matriculasAlumnoPeriodo = exports.getMatriculasAnualApoderado = exports.getMatriculasPeriodoAulaSubareaaApoderado = exports.getMatriculasPeriodoAulaSubareaCicloApoderado = exports.matriculasApoderado = exports.getMatriculaCiclo = exports.getMatriculasPeriodoAulaSubarea = exports.busquedaMatriculasSubarea = exports.getMatriculasAnual = exports.busquedaMatriculasPorAlumno = exports.getMatriculasPeriodoAulaSubareaCiclo = exports.getMatriculasProgramacionRangoFechas = exports.matriculasProgramacionCiclo = exports.perteneceMatriculaAlumno = exports.matriculasAlumno = exports.busquedaMatriculas = exports.getMatriculasSubarea = exports.getMatriculadetallesPeriodoAulaArea = exports.getMatriculadetallesPeriodoAula = exports.perteneceMatriculaMadre = exports.perteneceMatriculaPadre = exports.busquedaMatriculadetallesPorAlumnoMadrePeriodo = exports.busquedaMatriculadetallesPorAlumnoPadrePeriodo = exports.busquedaMatriculadetallesPorAlumnoMadre = exports.busquedaMatriculadetallesPorAlumnoPadre = exports.matriculasAlumnoPorMadrePeriodo = exports.matriculasAlumnoPorPadrePeriodo = exports.matriculasAlumnoPorMadre = exports.matriculasAlumnoPorPadre = exports.perteneceProgramacionAlumno = exports.perteneceMatriculadetalleAlumno = exports.busquedaMatriculadetallesPorAlumnoPeriodo = exports.busquedaMatriculadetallesPorAlumno = exports.matriculadetallesAlumnoPeriodo = exports.matriculadetallesAlumno = exports.getListadoAlumnosProgramacion = exports.getListadoAlumnos = exports.getMatriculadetallesProgramacion = exports.getMatriculadetallesMatriculaEstado = exports.getMatriculadetallesMatricula = exports.listarmatriculasanterior = exports.aprobadoAlumno = exports.existeMatricula = exports.busquedaMatriculadetalles = exports.deleteMatriculadetalle = exports.cambiarEstadoMatriculadetalle = exports.putMatriculadetalle = exports.postMatriculadetalle = exports.getMatriculadetalle = exports.getMatriculadetalles = void 0;
exports.matriculasMadrePeriodo = exports.matriculasPadrePeriodo = exports.getMatriculasPeriodoAulaAreaApoderado = exports.getMatriculasPeriodoAulaArea = exports.matriculasApoderadoPeriodoAula = exports.getMatriculaAnual = exports.matriculasAlumnoReporte = exports.busquedaMatriculasPorAlumnoPeriodo = void 0;
const sequelize_1 = require("sequelize");
const alumno_1 = __importDefault(require("../models/alumno"));
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const matricula_1 = __importDefault(require("../models/matricula"));
const programacion_1 = __importDefault(require("../models/programacion"));
const aula_1 = __importDefault(require("../models/aula"));
const nivel_1 = __importDefault(require("../models/nivel"));
const grado_1 = __importDefault(require("../models/grado"));
const seccion_1 = __importDefault(require("../models/seccion"));
const docente_1 = __importDefault(require("../models/docente"));
const periodo_1 = __importDefault(require("../models/periodo"));
const area_1 = __importDefault(require("../models/area"));
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const ciclo_1 = __importDefault(require("../models/ciclo"));
const nota_1 = __importDefault(require("../models/nota"));
const asistencia_1 = __importDefault(require("../models/asistencia"));
const matriculadetalle_1 = __importDefault(require("../models/matriculadetalle"));
const padre_1 = __importDefault(require("../models/padre"));
const madre_1 = __importDefault(require("../models/madre"));
const handleError_1 = require("../utils/handleError");
const getMatriculadetalles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: { estado: true }
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            attributes: ['id', 'aprobado'],
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetalles = getMatriculadetalles;
const getMatriculadetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findOne({
            where: {
                estado: true,
                id: id
            },
            attributes: ['id', 'aprobado'],
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                }
            ]
        });
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matriculadetalle con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            matriculadetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetalle = getMatriculadetalle;
const postMatriculadetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const matriculadetalle = matriculadetalle_1.default.build(body);
        yield matriculadetalle.save();
        const programacion = yield programacion_1.default.findOne({
            where: {
                id: body.programacionId
            },
            attributes: ['id', 'numeromat', 'numeromaxmat']
        });
        yield (programacion === null || programacion === void 0 ? void 0 : programacion.update({
            numeromat: Number(programacion.numeromat) + 1
        }));
        res.json({
            ok: true,
            msg: 'Matriculadetalle guardada exitosamente',
            matriculadetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postMatriculadetalle = postMatriculadetalle;
const putMatriculadetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findByPk(id);
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matriculadetalle con el id: ${id}`
            });
        }
        yield (matriculadetalle === null || matriculadetalle === void 0 ? void 0 : matriculadetalle.update(body));
        res.json({
            ok: true,
            msg: 'Matriculadetalle actualizada exitosamente',
            matriculadetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putMatriculadetalle = putMatriculadetalle;
const cambiarEstadoMatriculadetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, estado } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findByPk(id);
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una matriculadetalle con el id: ${id}`
            });
        }
        yield (matriculadetalle === null || matriculadetalle === void 0 ? void 0 : matriculadetalle.update({ estado }));
        res.json({
            ok: true,
            msg: 'Matriculadetalle actualizada exitosamente',
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.cambiarEstadoMatriculadetalle = cambiarEstadoMatriculadetalle;
const deleteMatriculadetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findByPk(id);
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una matriculadetalle con el id: ${id}`
            });
        }
        yield (matriculadetalle === null || matriculadetalle === void 0 ? void 0 : matriculadetalle.update({ estado: false }));
        const programacion = yield programacion_1.default.findOne({
            where: {
                id: matriculadetalle.programacionId
            }
        });
        programacion.numeromat = programacion.numeromat - 1;
        programacion.save();
        res.json({
            ok: true,
            msg: 'Matriculadetalle eliminada exitosamente',
            matriculadetalle
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteMatriculadetalle = deleteMatriculadetalle;
const busquedaMatriculadetalles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        let data = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                ],
            },
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            total: data.length,
            busquedas: data
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetalles = busquedaMatriculadetalles;
const existeMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodo, aula, alumno } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findOne({
            where: {
                '$programacion.periodo.id$': periodo,
                '$programacion.aula.id$': aula,
                '$matricula.alumno.id$': alumno,
                estado: true
            },
            include: [
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
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'tipovalor'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                    ]
                }
            ]
        });
        if (matriculadetalle) {
            return res.json({
                ok: true,
                msg: 'El alumno ya esta matriculado'
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
exports.existeMatricula = existeMatricula;
const aprobadoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                aprobado: true,
                '$matricula.alumno.id$': alumnoId,
            },
            include: [
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
        });
        if (matriculadetalles.length > 0) {
            return res.json({
                ok: true,
                msg: "Alumno aprobado"
            });
        }
        res.json({
            ok: false,
            msg: "El alumno no está aprobado"
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.aprobadoAlumno = aprobadoAlumno;
const listarmatriculasanterior = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
            },
            include: [
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
        });
        if (matriculadetalles.length > 0) {
            return res.json({
                ok: true,
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
exports.listarmatriculasanterior = listarmatriculasanterior;
const getMatriculadetallesMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                matriculaId: req.params.matriculaId
            },
            attributes: ['id', 'aprobado', 'estado'],
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetallesMatricula = getMatriculadetallesMatricula;
const getMatriculadetallesMatriculaEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                matriculaId: req.params.matriculaId
            },
            attributes: ['id', 'aprobado', 'estado'],
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetallesMatriculaEstado = getMatriculadetallesMatriculaEstado;
const getMatriculadetallesProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                programacionId: programacionId
            },
            attributes: ['id', 'aprobado'],
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            total: matriculadetalles.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetallesProgramacion = getMatriculadetallesProgramacion;
const getListadoAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const areas = yield area_1.default.findAll({
            where: {
                estado: true
            }
        });
        if (areas.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: "Area no encontrada"
            });
        }
        const listado = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$programacion.aula.id$': aulaId,
                '$programacion.periodo.id$': periodoId,
            },
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
                            attributes: ['id'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });
        if (listado.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: "No hay matriculas registradas para este periodo."
            });
        }
        const areaId = listado[0].programacion.area.id;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$programacion.aula.id$': aulaId,
                '$programacion.periodo.id$': periodoId,
                '$programacion.area.id$': areaId,
            },
            attributes: ['id', 'aprobado'],
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
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            total: matriculadetalles.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getListadoAlumnos = getListadoAlumnos;
const getListadoAlumnosProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, aulaId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$programacion.id$': programacionId,
            },
            attributes: ['id', 'aprobado'],
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
                    attributes: ['id']
                }
            ]
        });
        res.json({
            ok: true,
            matriculadetalles,
            total: matriculadetalles.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getListadoAlumnosProgramacion = getListadoAlumnosProgramacion;
const matriculadetallesAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId
            },
            include: [
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
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId
            },
            limit: 5,
            offset: desde,
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
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
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculadetallesAlumno = matriculadetallesAlumno;
const matriculadetallesAlumnoPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            include: [
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
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            limit: 5,
            offset: desde,
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
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
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
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculadetallesAlumnoPeriodo = matriculadetallesAlumnoPeriodo;
const busquedaMatriculadetallesPorAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId, valor } = req.params;
    try {
        let matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
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
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            busquedas: matriculadetalles,
            total: matriculadetalles.length,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetallesPorAlumno = busquedaMatriculadetallesPorAlumno;
const busquedaMatriculadetallesPorAlumnoPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId, periodoId, valor } = req.params;
    try {
        let matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
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
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            busquedas: matriculadetalles,
            total: matriculadetalles.length,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetallesPorAlumnoPeriodo = busquedaMatriculadetallesPorAlumnoPeriodo;
const perteneceMatriculadetalleAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculadetalleId, alumnoId } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findOne({
            where: {
                estado: true,
                id: matriculadetalleId,
                '$matricula.alumno.id$': alumnoId
            },
            include: [
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
        });
        if (matriculadetalle) {
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
exports.perteneceMatriculadetalleAlumno = perteneceMatriculadetalleAlumno;
const perteneceProgramacionAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, alumnoId } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findOne({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                programacionId: programacionId
            },
            include: [
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
        });
        if (matriculadetalle) {
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
exports.perteneceProgramacionAlumno = perteneceProgramacionAlumno;
const matriculasAlumnoPorPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': id,
            },
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
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': id,
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumnoPorPadre = matriculasAlumnoPorPadre;
const matriculasAlumnoPorMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': id,
            },
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
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': id,
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumnoPorMadre = matriculasAlumnoPorMadre;
const matriculasAlumnoPorPadrePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { padreId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
            },
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
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id']
                        }
                    ]
                }
            ]
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumnoPorPadrePeriodo = matriculasAlumnoPorPadrePeriodo;
const matriculasAlumnoPorMadrePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { madreId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
            },
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
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id']
                        }
                    ]
                }
            ]
        })).length;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumnoPorMadrePeriodo = matriculasAlumnoPorMadrePeriodo;
const busquedaMatriculadetallesPorAlumnoPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { padreId, valor } = req.params;
    try {
        let matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetallesPorAlumnoPadre = busquedaMatriculadetallesPorAlumnoPadre;
const busquedaMatriculadetallesPorAlumnoMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { madreId, valor } = req.params;
    try {
        let matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetallesPorAlumnoMadre = busquedaMatriculadetallesPorAlumnoMadre;
const busquedaMatriculadetallesPorAlumnoPadrePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { padreId, periodoId, valor } = req.params;
    try {
        let matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ]
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetallesPorAlumnoPadrePeriodo = busquedaMatriculadetallesPorAlumnoPadrePeriodo;
const busquedaMatriculadetallesPorAlumnoMadrePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { madreId, periodoId, valor } = req.params;
    try {
        let matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
                [sequelize_1.Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ]
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculadetallesPorAlumnoMadrePeriodo = busquedaMatriculadetallesPorAlumnoMadrePeriodo;
const perteneceMatriculaPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { padreId, matriculadetalleId } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findOne({
            where: {
                estado: true,
                id: matriculadetalleId,
                '$matricula.alumno.padre.id$': padreId
            },
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
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (matriculadetalle) {
            return res.json({
                ok: true,
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
exports.perteneceMatriculaPadre = perteneceMatriculaPadre;
const perteneceMatriculaMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { madreId, matriculadetalleId } = req.params;
    try {
        const matriculadetalle = yield matriculadetalle_1.default.findOne({
            where: {
                estado: true,
                id: matriculadetalleId,
                '$matricula.alumno.madre.id$': madreId
            },
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
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (matriculadetalle) {
            return res.json({
                ok: true,
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
exports.perteneceMatriculaMadre = perteneceMatriculaMadre;
const getMatriculadetallesPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const areas = yield area_1.default.findAll({
            where: {
                estado: true
            }
        });
        if (areas.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: "Area no encontrada"
            });
        }
        const listado = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$programacion.aula.id$': aulaId,
                '$programacion.periodo.id$': periodoId,
            },
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
                            attributes: ['id'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id']
                        },
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });
        const areaId = listado[0].programacion.area.id;
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.area.id$': areaId
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC'
                ]
            ],
            attributes: ['id'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId'],
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
                                },
                            ],
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
                            attributes: ['id', 'nombre', 'tipovalor']
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
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
            matriculadetalles,
            total: matriculadetalles.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetallesPeriodoAula = getMatriculadetallesPeriodoAula;
const getMatriculadetallesPeriodoAulaArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.area.id$': areaId
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC'
                ]
            ],
            attributes: ['id'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId'],
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
                                },
                            ],
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
                            attributes: ['id', 'nombre', 'tipovalor']
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
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
            matriculadetalles,
            total: matriculadetalles.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculadetallesPeriodoAulaArea = getMatriculadetallesPeriodoAulaArea;
const getMatriculasSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const { subareaId } = req.params;
    try {
        const total = (yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.subarea.id$': subareaId,
            },
            include: [
                {
                    model: programacion_1.default,
                    as: 'programacion',
                }
            ]
        })).length;
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.subarea.id$': subareaId,
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
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
        });
        res.json({
            ok: true,
            matriculas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasSubarea = getMatriculasSubarea;
const busquedaMatriculas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        let data = yield matricula_1.default.findAll({
            where: {
                '$alumno.persona.nombres$': {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
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
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
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
exports.busquedaMatriculas = busquedaMatriculas;
const matriculasAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matricula_1.default.findAll({
            where: { estado: true, alumnoId: id },
        })).length;
        const matriculas = yield matricula_1.default.findAll({
            where: { estado: true, alumnoId: id },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
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
        });
        res.json({
            ok: true,
            matriculas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumno = matriculasAlumno;
const perteneceMatriculaAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculaId, alumnoId } = req.params;
    try {
        const matricula = yield matricula_1.default.findOne({
            where: {
                estado: true,
                id: matriculaId,
                alumnoId: alumnoId
            }
        });
        if (matricula) {
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
exports.perteneceMatriculaAlumno = perteneceMatriculaAlumno;
const matriculasProgramacionCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, cicloId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                programacionId: programacionId,
                '$nota.ciclo.id$': cicloId,
                estado: true,
            },
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                },
                {
                    model: nota_1.default,
                    as: 'nota',
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
                }
            ]
        });
        res.json({
            ok: true,
            total: matriculas.length,
            matriculas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasProgramacionCiclo = matriculasProgramacionCiclo;
const getMatriculasProgramacionRangoFechas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, fechainicial } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                programacionId: programacionId,
                '$asistencia.fecha$': fechainicial,
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
                    ],
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
                },
                {
                    model: asistencia_1.default,
                    as: 'asistencia'
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasProgramacionRangoFechas = getMatriculasProgramacionRangoFechas;
const getMatriculasPeriodoAulaSubareaCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, cicloId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
                {
                    model: nota_1.default,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: ciclo_1.default,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                            where: {
                                id: cicloId
                            }
                        },
                        {
                            model: evaluacion_1.default,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasPeriodoAulaSubareaCiclo = getMatriculasPeriodoAulaSubareaCiclo;
const busquedaMatriculasPorAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId, valor } = req.params;
    try {
        let matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.id$': alumnoId,
                [sequelize_1.Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            total: matriculas.length,
            busquedas: matriculas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculasPorAlumno = busquedaMatriculasPorAlumno;
const getMatriculasAnual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
                {
                    model: nota_1.default,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: ciclo_1.default,
                            as: 'ciclo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: evaluacion_1.default,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasAnual = getMatriculasAnual;
const busquedaMatriculasSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, subareaId } = req.params;
    try {
        let data = yield matricula_1.default.findAll({
            where: {
                '$alumno.persona.nombres$': {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true,
                '$programacion.subarea.id$': subareaId,
            },
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
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
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
exports.busquedaMatriculasSubarea = busquedaMatriculasSubarea;
const getMatriculasPeriodoAulaSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasPeriodoAulaSubarea = getMatriculasPeriodoAulaSubarea;
const getMatriculaCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculaId, cicloId } = req.params;
    try {
        const matricula = yield matricula_1.default.findOne({
            where: {
                estado: true,
                id: matriculaId,
            },
            attributes: ['id', 'programacionId', 'alumnoId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
                {
                    model: nota_1.default,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: ciclo_1.default,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                            where: {
                                id: cicloId
                            }
                        },
                        {
                            model: evaluacion_1.default,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matricula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculaCiclo = getMatriculaCiclo;
const matriculasApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
            },
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
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
                                    as: 'persona'
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasApoderado = matriculasApoderado;
const getMatriculasPeriodoAulaSubareaCicloApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, cicloId, apoderadoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
                {
                    model: nota_1.default,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: ciclo_1.default,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                            where: {
                                id: cicloId
                            }
                        },
                        {
                            model: evaluacion_1.default,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasPeriodoAulaSubareaCicloApoderado = getMatriculasPeriodoAulaSubareaCicloApoderado;
const getMatriculasPeriodoAulaSubareaaApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, apoderadoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasPeriodoAulaSubareaaApoderado = getMatriculasPeriodoAulaSubareaaApoderado;
const getMatriculasAnualApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, apoderadoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
                {
                    model: nota_1.default,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: ciclo_1.default,
                            as: 'ciclo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: evaluacion_1.default,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasAnualApoderado = getMatriculasAnualApoderado;
const matriculasAlumnoPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matricula_1.default.findAll({
            where: {
                estado: true,
                alumnoId: alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            include: [
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    include: [
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                    ]
                }
            ]
        })).length;
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                alumnoId: alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
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
        });
        res.json({
            ok: true,
            matriculas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumnoPeriodo = matriculasAlumnoPeriodo;
const busquedaMatriculasPorAlumnoPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId, periodoId, valor } = req.params;
    try {
        let matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
                [sequelize_1.Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            total: matriculas.length,
            busquedas: matriculas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaMatriculasPorAlumnoPeriodo = busquedaMatriculasPorAlumnoPeriodo;
const matriculasAlumnoReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: { estado: true, alumnoId: alumnoId },
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
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
        });
        res.json({
            ok: true,
            matriculas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasAlumnoReporte = matriculasAlumnoReporte;
const getMatriculaAnual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculaId } = req.params;
    try {
        const matricula = yield matricula_1.default.findOne({
            where: {
                estado: true,
                id: matriculaId,
            },
            attributes: ['id', 'programacionId', 'alumnoId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                    ]
                },
                {
                    model: nota_1.default,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: ciclo_1.default,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: evaluacion_1.default,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matricula
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculaAnual = getMatriculaAnual;
const matriculasApoderadoPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId, periodoId, aulaId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
            },
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
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
                                    as: 'persona'
                                }
                            ]
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo'
                        },
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasApoderadoPeriodoAula = matriculasApoderadoPeriodoAula;
const getMatriculasPeriodoAulaArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.area.id$': areaId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        },
                    ],
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat'],
                    include: [
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
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                }
                            ]
                        },
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
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasPeriodoAulaArea = getMatriculasPeriodoAulaArea;
const getMatriculasPeriodoAulaAreaApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, apoderadoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.area.id$': areaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: alumno_1.default, as: 'alumno' }, { model: persona_1.default, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
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
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },
                        {
                            model: docente_1.default,
                            as: 'docente',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMatriculasPeriodoAulaAreaApoderado = getMatriculasPeriodoAulaAreaApoderado;
const matriculasPadrePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { padreId, periodoId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
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
                                },
                                {
                                    model: padre_1.default,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre', 'tipovalor'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasPadrePeriodo = matriculasPadrePeriodo;
const matriculasMadrePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { madreId, periodoId } = req.params;
    try {
        const matriculadetalles = yield matriculadetalle_1.default.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
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
                                },
                                {
                                    model: madre_1.default,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre', 'tipovalor'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.matriculasMadrePeriodo = matriculasMadrePeriodo;
//# sourceMappingURL=matriculadetalle.js.map