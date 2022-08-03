"use strict";
/*
    path: /api/situaciones
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const situacion_1 = require("../controllers/situacion");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, situacion_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, situacion_1.getSituaciones);
router.get('/:id', validar_jwt_1.validarJWT, situacion_1.getSituacion);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, situacion_1.busquedaSituaciones);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('abreviatura', 'La abreviatura es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], situacion_1.postSituacion);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('abreviatura', 'La abreviatura es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], situacion_1.putSituacion);
router.delete('/:id', validar_jwt_1.validarJWT, situacion_1.deleteSituacion);
exports.default = router;
//# sourceMappingURL=situacion.js.map