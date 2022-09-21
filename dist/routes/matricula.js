"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/matriculas
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const matricula_1 = require("../controllers/matricula");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, matricula_1.getMatriculas);
router.get('/subarea/:subareaId', validar_jwt_1.validarJWT, matricula_1.getMatriculasSubarea);
router.get('/:id', validar_jwt_1.validarJWT, matricula_1.getMatricula);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, matricula_1.busquedaMatriculas);
router.get('/busqueda/subarea/:subareaId/:valor', validar_jwt_1.validarJWT, matricula_1.busquedaMatriculasSubarea);
router.get('/existe/:periodo/:aula/:alumno', validar_jwt_1.validarJWT, matricula_1.existeMatricula);
router.get('/programacion/alumnos/:programacionId', validar_jwt_1.validarJWT, matricula_1.getMatriculasProgramacion);
router.get('/alumno/:id', validar_jwt_1.validarJWT, matricula_1.matriculasAlumno);
router.get('/alumnoreporte/:alumnoId', validar_jwt_1.validarJWT, matricula_1.matriculasAlumnoReporte);
router.get('/pertenece/:matriculaId/:alumnoId', validar_jwt_1.validarJWT, matricula_1.perteneceMatriculaAlumno);
router.get('/pertenece/programacion/:programacionId/:alumnoId', validar_jwt_1.validarJWT, matricula_1.perteneceProgramacionAlumno);
router.get('/programacion/ciclo/:programacionId/:cicloId', validar_jwt_1.validarJWT, matricula_1.matriculasProgramacionCiclo);
router.get('/programacion/fecha/:programacionId/:fechainicial', validar_jwt_1.validarJWT, matricula_1.getMatriculasProgramacionRangoFechas);
router.get('/alumno/apoderado/:id', validar_jwt_1.validarJWT, matricula_1.matriculasAlumnoPorApoderado);
router.get('/pertenece/apoderado/:apoderadoId/:matriculaId', validar_jwt_1.validarJWT, matricula_1.perteneceMatriculaApoderado);
router.get('/obtenermatriculas/:periodoId/:aulaId/:subareaId/:cicloId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAulaSubareaCiclo);
router.get('/alumnoperiodo/:alumnoId/:periodoId', validar_jwt_1.validarJWT, matricula_1.matriculasAlumnoPeriodo);
router.get('/obtenermatriculasapoderado/:periodoId/:aulaId/:subareaId/:cicloId/:apoderadoId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAulaSubareaCicloApoderado);
router.get('/alumno/apoderadoperiodo/:apoderadoId/:periodoId', validar_jwt_1.validarJWT, matricula_1.matriculasAlumnoPorApoderadoPeriodo);
router.get('/obtenermatriculaalumno/:matriculaId/:cicloId', validar_jwt_1.validarJWT, matricula_1.getMatriculaCiclo);
router.get('/obtenermatriculaalumnoanual/:matriculaId', validar_jwt_1.validarJWT, matricula_1.getMatriculaAnual);
router.get('/listamatriculas/:periodoId/:aulaId/:subareaId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAulaSubarea);
router.get('/listamatriculasapoderado/:periodoId/:aulaId/:subareaId/:apoderadoId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAulaSubareaaApoderado);
router.get('/listamatriculasarea/:periodoId/:aulaId/:areaId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAulaArea);
router.get('/listamatriculasapoderadoarea/:periodoId/:aulaId/:areaId/:apoderadoId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAulaAreaApoderado);
router.get('/busquedaapoderado/:apoderadoId/:valor', validar_jwt_1.validarJWT, matricula_1.busquedaMatriculasPorAlumnoApoderado);
router.get('/busquedaapoderadoperiodo/:apoderadoId/:periodoId/:valor', validar_jwt_1.validarJWT, matricula_1.busquedaMatriculasPorAlumnoApoderadoPeriodo);
router.get('/busquedaalumno/:alumnoId/:valor', validar_jwt_1.validarJWT, matricula_1.busquedaMatriculasPorAlumno);
router.get('/busquedaalumnoperiodo/:alumnoId/:periodoId/:valor', validar_jwt_1.validarJWT, matricula_1.busquedaMatriculasPorAlumnoPeriodo);
router.get('/anual/:periodoId/:aulaId/:subareaId', validar_jwt_1.validarJWT, matricula_1.getMatriculasAnual);
router.get('/anualapoderado/:periodoId/:aulaId/:subareaId/:apoderadoId', validar_jwt_1.validarJWT, matricula_1.getMatriculasAnualApoderado);
router.get('/alumno/apoderado/reporte/:apoderadoId', validar_jwt_1.validarJWT, matricula_1.matriculasApoderado);
router.get('/apoderado/parahorario/:apoderadoId/:periodoId/:aulaId', validar_jwt_1.validarJWT, matricula_1.matriculasApoderadoPeriodoAula);
router.get('/periodoaula/:periodoId/:aulaId', validar_jwt_1.validarJWT, matricula_1.getMatriculasPeriodoAula);
router.get('/aprobado/:alumnoId', validar_jwt_1.validarJWT, matricula_1.aprobadoAlumno);
router.get('/periodoanterior/:alumnoId', validar_jwt_1.validarJWT, matricula_1.listarmatriculasanterior);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], matricula_1.postMatricula);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], matricula_1.putMatricula);
router.delete('/:id', validar_jwt_1.validarJWT, matricula_1.deleteMatricula);
exports.default = router;
//# sourceMappingURL=matricula.js.map