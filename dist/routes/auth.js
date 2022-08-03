"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/auth
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_1.login);
router.get('/renew', validar_jwt_1.validarJWT, auth_1.renewToken);
exports.default = router;
//# sourceMappingURL=auth.js.map