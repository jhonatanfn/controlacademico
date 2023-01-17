"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/matriculadetalles
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const matriculadetalle_1 = require("../controllers/matriculadetalle");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetalles);
router.get('/matricula/:matriculaId', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetallesMatricula);
router.get('/matriculaestado/:matriculaId', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetallesMatriculaEstado);
router.get('/:id', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetalle);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetalles);
router.get('/listado/:periodoId/:aulaId', validar_jwt_1.validarJWT, matriculadetalle_1.getListadoAlumnos);
router.get('/listadoalumnos/:programacionId', validar_jwt_1.validarJWT, matriculadetalle_1.getListadoAlumnosProgramacion);
router.get('/alumno/:alumnoId', validar_jwt_1.validarJWT, matriculadetalle_1.matriculadetallesAlumno);
router.get('/alumnoperiodo/:alumnoId/:periodoId', validar_jwt_1.validarJWT, matriculadetalle_1.matriculadetallesAlumnoPeriodo);
router.get('/busquedaalumno/:alumnoId/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetallesPorAlumno);
router.get('/busquedaalumnoperiodo/:alumnoId/:periodoId/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetallesPorAlumnoPeriodo);
router.get('/pertenece/:matriculadetalleId/:alumnoId', validar_jwt_1.validarJWT, matriculadetalle_1.perteneceMatriculadetalleAlumno);
router.get('/pertenece/programacion/:programacionId/:alumnoId', validar_jwt_1.validarJWT, matriculadetalle_1.perteneceProgramacionAlumno);
router.get('/existe/:periodo/:aula/:alumno', validar_jwt_1.validarJWT, matriculadetalle_1.existeMatricula);
router.get('/aprobado/:alumnoId', validar_jwt_1.validarJWT, matriculadetalle_1.aprobadoAlumno);
router.get('/periodoanterior/:alumnoId', validar_jwt_1.validarJWT, matriculadetalle_1.listarmatriculasanterior);
router.get('/programacion/:programacionId', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetallesProgramacion);
router.get('/alumno/padreperiodo/:padreId/:periodoId', validar_jwt_1.validarJWT, matriculadetalle_1.matriculasAlumnoPorPadrePeriodo);
router.get('/alumno/padre/:id', validar_jwt_1.validarJWT, matriculadetalle_1.matriculasAlumnoPorPadre);
router.get('/busquedapadre/:padreId/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetallesPorAlumnoPadre);
router.get('/busquedapadreperiodo/:padreId/:periodoId/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetallesPorAlumnoPadrePeriodo);
router.get('/pertenece/padre/:padreId/:matriculadetalleId', validar_jwt_1.validarJWT, matriculadetalle_1.perteneceMatriculaPadre);
router.get('/alumno/madreperiodo/:madreId/:periodoId', validar_jwt_1.validarJWT, matriculadetalle_1.matriculasAlumnoPorMadrePeriodo);
router.get('/alumno/madre/:id', validar_jwt_1.validarJWT, matriculadetalle_1.matriculasAlumnoPorMadre);
router.get('/busquedamadre/:madreId/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetallesPorAlumnoMadre);
router.get('/busquedamadreperiodo/:madreId/:periodoId/:valor', validar_jwt_1.validarJWT, matriculadetalle_1.busquedaMatriculadetallesPorAlumnoMadrePeriodo);
router.get('/pertenece/madre/:madreId/:matriculadetalleId', validar_jwt_1.validarJWT, matriculadetalle_1.perteneceMatriculaMadre);
router.get('/periodoaula/:periodoId/:aulaId', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetallesPeriodoAula);
router.get('/periodoaulaarea/:periodoId/:aulaId/:areaId', validar_jwt_1.validarJWT, matriculadetalle_1.getMatriculadetallesPeriodoAulaArea);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('matriculaId', 'La matricula es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('programacionId', 'La programacion es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], matriculadetalle_1.postMatriculadetalle);
router.put('/cambiarestado/:estado/:id', [
    validar_jwt_1.validarJWT,
], matriculadetalle_1.cambiarEstadoMatriculadetalle);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('matriculaId', 'La matricula es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('programacionId', 'La programacion es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], matriculadetalle_1.putMatriculadetalle);
router.delete('/:id', validar_jwt_1.validarJWT, matriculadetalle_1.deleteMatriculadetalle);
router.get('/alumno/porpadre/:padreId/:periodoId', validar_jwt_1.validarJWT, matriculadetalle_1.matriculasPadrePeriodo);
router.get('/alumno/pormadre/:madreId/:periodoId', validar_jwt_1.validarJWT, matriculadetalle_1.matriculasMadrePeriodo);
exports.default = router;
//# sourceMappingURL=matriculadetalle.js.map