"use strict";
/*
    path: /api/roles
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const role_1 = require("../controllers/role");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, role_1.getRoles);
router.get('/:id', validar_jwt_1.validarJWT, role_1.getRole);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], role_1.postRole);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], role_1.putRole);
router.delete('/:id', validar_jwt_1.validarJWT, role_1.deleteRole);
exports.default = router;
//# sourceMappingURL=role.js.map