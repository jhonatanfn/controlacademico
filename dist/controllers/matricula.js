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
exports.getMatriculasPeriodoAulaAreaApoderado = exports.getMatriculasPeriodoAulaArea = exports.matriculasApoderadoPeriodoAula = exports.getMatriculaAnual = exports.matriculasAlumnoReporte = exports.busquedaMatriculasPorAlumnoPeriodo = exports.matriculasAlumnoPeriodo = exports.busquedaMatriculasPorAlumnoApoderadoPeriodo = exports.matriculasAlumnoPorApoderadoPeriodo = exports.getMatriculasAnualApoderado = exports.getMatriculasPeriodoAulaSubareaaApoderado = exports.getMatriculasPeriodoAulaSubareaCicloApoderado = exports.matriculasApoderado = exports.getMatriculaCiclo = exports.getMatriculasPeriodoAulaSubarea = exports.busquedaMatriculasSubarea = exports.getMatriculasAnual = exports.busquedaMatriculasPorAlumno = exports.busquedaMatriculasPorAlumnoApoderado = exports.getMatriculasPeriodoAulaSubareaCiclo = exports.perteneceMatriculaApoderado = exports.matriculasAlumnoPorApoderado = exports.getMatriculasProgramacionRangoFechas = exports.matriculasProgramacionCiclo = exports.perteneceProgramacionAlumno = exports.perteneceMatriculaAlumno = exports.matriculasAlumno = exports.existeMatricula = exports.busquedaMatriculas = exports.deleteMatricula = exports.putMatricula = exports.postMatricula = exports.getMatricula = exports.getMatriculasSubarea = exports.getMatriculas = exports.getMatriculasProgramacion = void 0;
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
const subarea_1 = __importDefault(require("../models/subarea"));
const area_1 = __importDefault(require("../models/area"));
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const ciclo_1 = __importDefault(require("../models/ciclo"));
const nota_1 = __importDefault(require("../models/nota"));
const asistencia_1 = __importDefault(require("../models/asistencia"));
const apoderado_1 = __importDefault(require("../models/apoderado"));
const getMatriculasProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacion } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                programacionId: programacion
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
                },
                {
                    model: asistencia_1.default,
                    as: 'asistencia'
                }
            ]
        });
        if (matriculas.length > 0) {
            return res.json({
                ok: true,
                matriculas,
                total: matriculas.length
            });
        }
        else {
            res.json({
                ok: false,
                msg: "No hay registros"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getMatriculasProgramacion = getMatriculasProgramacion;
const getMatriculas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matricula_1.default.findAll({
            where: { estado: true }
        })).length;
        const matriculas = yield matricula_1.default.findAll({
            where: { estado: true },
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
        });
        res.json({
            ok: true,
            matriculas,
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
exports.getMatriculas = getMatriculas;
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
                    include: [
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
        });
        res.json({
            ok: true,
            matriculas,
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
exports.getMatriculasSubarea = getMatriculasSubarea;
const getMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const matricula = yield matricula_1.default.findByPk(id, {
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
        });
        if (!matricula || matricula.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matricula con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            matricula
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
exports.getMatricula = getMatricula;
const postMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const matricula = matricula_1.default.build(body);
        yield matricula.save();
        const programacion = yield programacion_1.default.findOne({
            where: {
                id: body.programacionId
            }
        });
        programacion.numeromat = programacion.numeromat + 1;
        programacion.save();
        res.json({
            ok: true,
            msg: 'Matricula guardada exitosamente',
            matricula
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
exports.postMatricula = postMatricula;
const putMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const matricula = yield matricula_1.default.findByPk(id);
        if (!matricula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matricula con el id: ${id}`
            });
        }
        yield (matricula === null || matricula === void 0 ? void 0 : matricula.update(body));
        res.json({
            ok: true,
            msg: 'Matricula actualizada exitosamente',
            matricula
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
exports.putMatricula = putMatricula;
const deleteMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const matricula = yield matricula_1.default.findByPk(id);
        if (!matricula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una matricula con el id: ${id}`
            });
        }
        yield (matricula === null || matricula === void 0 ? void 0 : matricula.update({ estado: false }));
        const programacion = yield programacion_1.default.findOne({
            where: {
                id: matricula.programacionId
            }
        });
        programacion.numeromat += 1;
        programacion.save();
        res.json({
            ok: true,
            msg: 'Matricula eliminada exitosamente',
            matricula
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
exports.deleteMatricula = deleteMatricula;
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
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
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
exports.busquedaMatriculas = busquedaMatriculas;
const existeMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodo, aula, alumno } = req.params;
    try {
        const matricula = yield matricula_1.default.findOne({
            where: {
                alumnoId: alumno,
                estado: true
            },
            include: [
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    where: {
                        periodoId: periodo,
                        aulaId: aula
                    }
                }
            ]
        });
        if (matricula) {
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.existeMatricula = existeMatricula;
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
        });
        res.json({
            ok: true,
            matriculas,
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.perteneceMatriculaAlumno = perteneceMatriculaAlumno;
const perteneceProgramacionAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, alumnoId } = req.params;
    try {
        const matricula = yield matricula_1.default.findOne({
            where: {
                estado: true,
                alumnoId: alumnoId,
                programacionId: programacionId
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.perteneceProgramacionAlumno = perteneceProgramacionAlumno;
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getMatriculasProgramacionRangoFechas = getMatriculasProgramacionRangoFechas;
const matriculasAlumnoPorApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': id,
            },
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
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
                                    as: 'persona'
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
                },
            ]
        })).length;
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': id,
            },
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
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
                                    as: 'persona'
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
                },
            ]
        });
        return res.json({
            ok: true,
            matriculas,
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
exports.matriculasAlumnoPorApoderado = matriculasAlumnoPorApoderado;
const perteneceMatriculaApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId, matriculaId } = req.params;
    try {
        const matricula = yield matricula_1.default.findOne({
            where: {
                estado: true,
                id: matriculaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: apoderado_1.default,
                            as: 'apoderado'
                        }
                    ]
                }
            ]
        });
        if (matricula) {
            return res.json({
                ok: true,
            });
        }
        res.json({
            ok: false,
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
exports.perteneceMatriculaApoderado = perteneceMatriculaApoderado;
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getMatriculasPeriodoAulaSubareaCiclo = getMatriculasPeriodoAulaSubareaCiclo;
const busquedaMatriculasPorAlumnoApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId, valor } = req.params;
    try {
        let matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
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
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaMatriculasPorAlumnoApoderado = busquedaMatriculasPorAlumnoApoderado;
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
            order: [
                [
                    { model: programacion_1.default, as: 'programacion' },
                    { model: subarea_1.default, as: 'subarea' },
                    'nombre', 'ASC'
                ]
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
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
                                    as: 'persona'
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
                },
            ]
        });
        return res.json({
            ok: true,
            matriculas
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getMatriculasAnualApoderado = getMatriculasAnualApoderado;
const matriculasAlumnoPorApoderadoPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
            },
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
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
                                    as: 'persona'
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
                },
            ]
        })).length;
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
            },
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
                        },
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
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
                                    as: 'persona'
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
                },
            ]
        });
        return res.json({
            ok: true,
            matriculas,
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
exports.matriculasAlumnoPorApoderadoPeriodo = matriculasAlumnoPorApoderadoPeriodo;
const busquedaMatriculasPorAlumnoApoderadoPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId, periodoId, valor } = req.params;
    try {
        let matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
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
            order: [
                [
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaMatriculasPorAlumnoApoderadoPeriodo = busquedaMatriculasPorAlumnoApoderadoPeriodo;
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
        });
        res.json({
            ok: true,
            matriculas,
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
            order: [
                [
                    { model: programacion_1.default, as: 'programacion' },
                    { model: subarea_1.default, as: 'subarea' },
                    'nombre', 'ASC'
                ]
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        });
        res.json({
            ok: true,
            matriculas
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona'
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
                                    as: 'persona'
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
                },
            ]
        });
        return res.json({
            ok: true,
            matriculas
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
exports.matriculasApoderadoPeriodoAula = matriculasApoderadoPeriodoAula;
const getMatriculasPeriodoAulaArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.area.id$': areaId
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                        {
                            model: apoderado_1.default,
                            as: 'apoderado',
                            attributes: ['id'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
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
                            attributes: ['id', 'nombre']
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getMatriculasPeriodoAulaAreaApoderado = getMatriculasPeriodoAulaAreaApoderado;
//# sourceMappingURL=matricula.js.map