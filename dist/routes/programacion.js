"use strict";
/*
    path: /api/programaciones
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const programacion_1 = require("../controllers/programacion");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, programacion_1.getProgramaciones);
router.get('/:id', validar_jwt_1.validarJWT, programacion_1.getProgramacion);
router.get('/periodo/aula/:periodoid/:aulaid', validar_jwt_1.validarJWT, programacion_1.getProgramacionesPeriodoAula);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, programacion_1.busquedaProgramaciones);
router.get('/busqueda/subarea/:valor', validar_jwt_1.validarJWT, programacion_1.busquedaProgramacionesSubarea);
router.get('/existe/:periodo/:aula/:area', validar_jwt_1.validarJWT, programacion_1.existeProgramacion);
router.get('/existeeditar/:periodoId/:aulaId/:areaId/:programacionId', validar_jwt_1.validarJWT, programacion_1.existeProgramacionEditar);
router.get('/docente/:docente', validar_jwt_1.validarJWT, programacion_1.getProgramacionesDocente);
router.get('/docente/periodopaginado/:docente/:periodo', validar_jwt_1.validarJWT, programacion_1.getProgramacionesDocentePeriodoPaginado);
router.get('/busqueda/pordocenteperiodo/:docenteId/:periodoId/:valor', validar_jwt_1.validarJWT, programacion_1.busquedaProgramacionesSubareaPorDocentePeriodo);
router.get('/busqueda/pordocente/:docenteId/:valor', validar_jwt_1.validarJWT, programacion_1.busquedaProgramacionesSubareaPorDocente);
router.get('/docente/todo/:docente', validar_jwt_1.validarJWT, programacion_1.getProgramacionesDocenteTodo);
router.get('/docente/periodopaginado/todo/:docente/:periodo', validar_jwt_1.validarJWT, programacion_1.getProgramacionesDocentePeriodoPaginadoTodo);
router.get('/pertenece/:programacionId/:docenteId', validar_jwt_1.validarJWT, programacion_1.perteneceProgramacionDocente);
router.get('/perteneceaula/:aulaId/:docenteId', validar_jwt_1.validarJWT, programacion_1.perteneceAulaDocente);
router.get('/docente/periodo/:docente/:periodo', validar_jwt_1.validarJWT, programacion_1.getProgramacionesDocentePeriodo);
router.get('/periodo/:id', validar_jwt_1.validarJWT, programacion_1.programacionPeriodo);
router.get('/periodopaginado/:id', validar_jwt_1.validarJWT, programacion_1.programacionPeriodoPaginado);
router.get('/busqueda/docente/:valor', validar_jwt_1.validarJWT, programacion_1.busquedaProgramacionesPorDocente);
router.get('/busqueda/administradorperiodo/:periodoId/:valor', validar_jwt_1.validarJWT, programacion_1.getProgramacionesAdministradorPeriodo);
router.get('/busqueda/administrador/:valor', validar_jwt_1.validarJWT, programacion_1.getProgramacionesAdministrador);
router.get('/completas/todos/:periodoId/:aulaId', validar_jwt_1.validarJWT, programacion_1.isProgramacionesCompletas);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('periodoId', 'El periodo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('aulaId', 'El aula es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('areaId', 'El area es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('docenteId', 'El docente es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], programacion_1.postProgramacion);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('periodoId', 'El periodo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('aulaId', 'El aula es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('areaId', 'El area es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('docenteId', 'El docente es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('numeromaxmat', 'El numero maximo es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], programacion_1.putProgramacion);
router.delete('/:id', validar_jwt_1.validarJWT, programacion_1.deleteProgramacion);
exports.default = router;
//# sourceMappingURL=programacion.js.map