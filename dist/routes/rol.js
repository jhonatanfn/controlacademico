"use strict";
/*
    path: /api/roles
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const rol_1 = require("../controllers/rol");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, rol_1.getRoles);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], rol_1.postRol);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], rol_1.putRol);
router.delete('/:id', validar_jwt_1.validarJWT, rol_1.deleteRol);
exports.default = router;
//# sourceMappingURL=rol.js.map