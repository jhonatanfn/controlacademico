"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/asistencias
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const asistencia_1 = require("../controllers/asistencia");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, asistencia_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, asistencia_1.getAsistencias);
router.get('/:id', validar_jwt_1.validarJWT, asistencia_1.getAsistencia);
router.get('/programacion/fecha/:programacionId/:fecha', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasProgramacionFecha);
router.get('/matricula/fecha/:id/:fechainicial', validar_jwt_1.validarJWT, asistencia_1.asistenciasPorMatricula);
router.get('/asistencia/existe/:programacionId/:fecha', validar_jwt_1.validarJWT, asistencia_1.existeAsistenciaProgramacionFecha);
router.get('/obtenerasistencias/:periodoId/:aulaId/:subareaId/:fecha', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodoAulaSubareaFecha);
router.get('/matricula/rangofecha/:matriculaId/:fechainicial/:fechafinal', validar_jwt_1.validarJWT, asistencia_1.asistenciasPorMatriculaRango);
router.get('/rango/:periodoId/:aulaId/:subareaId/:fechainicial/:fechafinal', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasRango);
router.get('/rangomatricula/:periodoId/:aulaId/:subareaId/:matriculaId/:fechainicial/:fechafinal', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasRangoMatricula);
router.get('/obtenerasistenciasapoderado/:periodoId/:aulaId/:subareaId/:fecha/:apoderadoId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodoAulaSubareaFechaApoderado);
router.get('/rangoapoderado/:periodoId/:aulaId/:subareaId/:fechainicial/:fechafinal/:apoderadoId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasRangoApoderado);
router.get('/porperiodo/:periodoId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodo);
router.get('/reportedos/porperiodoaula/:periodoId/:aulaId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodoAula);
router.get('/reportetres/porperiodoaulaarea/:periodoId/:aulaId/:areaId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodoAulaArea);
router.get('/porperiodoaulaareasubarea/:periodoId/:aulaId/:areaId/:subareaId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodoAulaAreaSubarea);
router.get('/porperiodoaulaareasubareacicloalumno/:periodoId/:aulaId/:areaId/:subareaId/:alumnoId', validar_jwt_1.validarJWT, asistencia_1.getAsistenciasPeriodoAulaAreaSubareaCicloAlumno);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('fecha', 'El fecha es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('matriculaId', 'La matricula es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('situacionId', 'La situacion es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], asistencia_1.postAsistencia);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('fecha', 'El fecha es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('matriculaId', 'La matricula es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('situacionId', 'La situacion es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], asistencia_1.putAsistencia);
router.delete('/:id', validar_jwt_1.validarJWT, asistencia_1.deleteAsistencia);
exports.default = router;
//# sourceMappingURL=asistencia.js.map