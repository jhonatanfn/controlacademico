"use strict";
/*
    path: /api/instituciones
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const institucion_1 = require("../controllers/institucion");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/:id', institucion_1.getInstitucion);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('direccion', 'La direccion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('telefono', 'El telefono es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], institucion_1.postInstitucion);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('direccion', 'La direccion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('telefono', 'El telefono es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], institucion_1.putInstitucion);
router.delete('/:id', validar_jwt_1.validarJWT, institucion_1.deleteInstitucion);
exports.default = router;
//# sourceMappingURL=institucion.js.map