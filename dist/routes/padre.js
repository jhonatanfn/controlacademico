"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/padres
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const padre_1 = require("../controllers/padre");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, padre_1.getPadres);
router.get('/todo', validar_jwt_1.validarJWT, padre_1.getPadresTodos);
router.get('/:id', validar_jwt_1.validarJWT, padre_1.getPadre);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, padre_1.busquedaPadres);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, padre_1.searchDNI);
router.get('/persona/:id', validar_jwt_1.validarJWT, padre_1.padrePorPersona);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombreusuario', 'El nombre usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('dniusuario', 'El dni usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], padre_1.postPadre);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], padre_1.putPadre);
router.delete('/:id', validar_jwt_1.validarJWT, padre_1.deletePadre);
router.get('/consultadni/:dni', validar_jwt_1.validarJWT, padre_1.getPadreDNI);
exports.default = router;
//# sourceMappingURL=padre.js.map