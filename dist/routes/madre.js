"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/madres
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const madre_1 = require("../controllers/madre");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, madre_1.getMadres);
router.get('/todo', validar_jwt_1.validarJWT, madre_1.getMadresTodos);
router.get('/:id', validar_jwt_1.validarJWT, madre_1.getMadre);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, madre_1.busquedaMadres);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, madre_1.searchDNI);
router.get('/persona/:id', validar_jwt_1.validarJWT, madre_1.madrePorPersona);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombreusuario', 'El nombre usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('dniusuario', 'El dni usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], madre_1.postMadre);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], madre_1.putMadre);
router.delete('/:id', validar_jwt_1.validarJWT, madre_1.deleteMadre);
router.get('/consultadni/:dni', validar_jwt_1.validarJWT, madre_1.getMadreDNI);
exports.default = router;
//# sourceMappingURL=madre.js.map