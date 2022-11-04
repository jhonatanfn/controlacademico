"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/auxiliares
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auxiliar_1 = require("../controllers/auxiliar");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, auxiliar_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, auxiliar_1.getAuxiliares);
router.get('/:id', validar_jwt_1.validarJWT, auxiliar_1.getAuxiliar);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, auxiliar_1.busquedaAuxiliares);
router.get('/persona/:persona', validar_jwt_1.validarJWT, auxiliar_1.getAuxiliarPersona);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, auxiliar_1.searchDNI);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombreusuario', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('dniusuario', 'El dni usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], auxiliar_1.postAuxiliar);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], auxiliar_1.putAuxiliar);
router.delete('/:id', validar_jwt_1.validarJWT, auxiliar_1.deleteAuxiliar);
exports.default = router;
//# sourceMappingURL=auxiliar.js.map