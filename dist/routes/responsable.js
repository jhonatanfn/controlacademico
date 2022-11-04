"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/responsables
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const responsable_1 = require("../controllers/responsable");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, responsable_1.getResponsables);
router.get('/todo', validar_jwt_1.validarJWT, responsable_1.getResponsablesTodos);
router.get('/:id', validar_jwt_1.validarJWT, responsable_1.getResponsable);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, responsable_1.busquedaResponsables);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, responsable_1.searchDNI);
router.get('/persona/:id', validar_jwt_1.validarJWT, responsable_1.responsablePorPersona);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], responsable_1.postResponsable);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], responsable_1.putResponsable);
router.delete('/:id', validar_jwt_1.validarJWT, responsable_1.deleteResponsable);
router.get('/consultadni/:dni', validar_jwt_1.validarJWT, responsable_1.getResponsableDNI);
exports.default = router;
//# sourceMappingURL=responsable.js.map