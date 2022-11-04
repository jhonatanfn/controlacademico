"use strict";
/*
    path: /api/personas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const persona_1 = require("../controllers/persona");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, persona_1.getPersonas);
router.get('/:id', validar_jwt_1.validarJWT, persona_1.getPersona);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('dni', 'El dni del documento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombres', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidopaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidomaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipodocumentoId', 'El tipo documento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('sexo', 'El sexo es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], persona_1.postPersona);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('dni', 'El dni del documento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombres', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidopaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidomaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipodocumentoId', 'El tipo documento es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('sexo', 'El sexo es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], persona_1.putPersona);
router.delete('/:id', validar_jwt_1.validarJWT, persona_1.deletePersona);
router.get('/consultadni/:dni', validar_jwt_1.validarJWT, persona_1.getPersonaDNI);
exports.default = router;
//# sourceMappingURL=persona.js.map