"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/directores
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const director_1 = require("../controllers/director");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, director_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, director_1.getDirectores);
router.get('/:id', validar_jwt_1.validarJWT, director_1.getDirector);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, director_1.busquedaDirectores);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, director_1.searchDNI);
router.get('/persona/:persona', validar_jwt_1.validarJWT, director_1.getDirectorPersona);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], director_1.postDirector);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], director_1.putDirector);
router.delete('/:id', validar_jwt_1.validarJWT, director_1.deleteDirector);
exports.default = router;
//# sourceMappingURL=director.js.map