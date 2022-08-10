"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/notas
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const nota_1 = require("../controllers/nota");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, nota_1.getNotas);
router.get('/:id', validar_jwt_1.validarJWT, nota_1.getNota);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, nota_1.busquedaNotas);
router.get('/programacion/fecha/evaluacion/ciclo/:programacionId/:fecha/:evaluacionId/:cicloId', validar_jwt_1.validarJWT, nota_1.getNotasProgramacionFechaEvaluacionCiclo);
router.get('/:id', validar_jwt_1.validarJWT, nota_1.getNotasMatricula);
router.get('/:matriculaId/:cicloId/:evaluacionId', validar_jwt_1.validarJWT, nota_1.getNotasMatriculaCicloEvaluacion);
router.get('/area/:periodoId/:aulaId/:areaId/:cicloId/:alumnoId', validar_jwt_1.validarJWT, nota_1.getNotasArea);
router.get('/porperiodo/:periodoId', validar_jwt_1.validarJWT, nota_1.getNotasPeriodo);
router.get('/reportedos/porperiodoaula/:periodoId/:aulaId', validar_jwt_1.validarJWT, nota_1.getNotasPeriodoAula);
router.get('/reportetres/porperiodoaulaarea/:periodoId/:aulaId/:areaId', validar_jwt_1.validarJWT, nota_1.getNotasPeriodoAulaArea);
router.get('/porperiodoaulaareasubarea/:periodoId/:aulaId/:areaId/:subareaId', validar_jwt_1.validarJWT, nota_1.getNotasPeriodoAulaAreaSubarea);
router.get('/porperiodoaulaareasubareaciclo/:periodoId/:aulaId/:areaId/:subareaId/:cicloId', validar_jwt_1.validarJWT, nota_1.getNotasPeriodoAulaAreaSubareaCiclo);
router.get('/porperiodoaulaareasubareacicloalumno/:periodoId/:aulaId/:areaId/:subareaId/:cicloId/:alumnoId', validar_jwt_1.validarJWT, nota_1.getNotasPeriodoAulaAreaSubareaCicloAlumno);
router.get('/parahoynotas/periodofecha/:periodoId/:fecha', validar_jwt_1.validarJWT, nota_1.getNotasHoy);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('matriculaId', 'La Matricula es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('evaluacionId', 'La Evaluacion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('cicloId', 'El Ciclo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('valor', 'El valor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], nota_1.postNota);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('matriculaId', 'La Matricula es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('evaluacionId', 'La Evaluacion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('cicloId', 'El Ciclo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('valor', 'El valor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], nota_1.putNota);
router.delete('/:id', validar_jwt_1.validarJWT, nota_1.deleteNota);
exports.default = router;
//# sourceMappingURL=nota.js.map