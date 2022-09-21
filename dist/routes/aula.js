"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/aulas
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const aula_1 = require("../controllers/aula");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, aula_1.getAulas);
router.get('/todo', validar_jwt_1.validarJWT, aula_1.getTodo);
router.get('/aula/:nivel/:grado/:seccion', validar_jwt_1.validarJWT, aula_1.getAulaPorNivelGradoSeccion);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, aula_1.busquedaAulas);
router.get('/:id', validar_jwt_1.validarJWT, aula_1.getAula);
router.get('/busquedatotal/:valor', validar_jwt_1.validarJWT, aula_1.busquedaAulasTotal);
router.get('/tieneprogramaciones/:aulaId', validar_jwt_1.validarJWT, aula_1.tieneProgramaciones);
router.get('/existeaula/:nivelId/:gradoId/:seccionId', validar_jwt_1.validarJWT, aula_1.existeAula);
router.get('/existeaulaeditar/:nivelId/:gradoId/:seccionId/:idAula', validar_jwt_1.validarJWT, aula_1.existeAulaEditar);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nivelId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('gradoId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('seccionId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], aula_1.postAula);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nivelId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('gradoId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('seccionId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], aula_1.putAula);
router.delete('/:id', validar_jwt_1.validarJWT, aula_1.deleteAula);
exports.default = router;
//# sourceMappingURL=aula.js.map