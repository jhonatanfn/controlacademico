"use strict";
/*
    path: /api/tipodocumentos
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tipodocumento_1 = require("../controllers/tipodocumento");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, tipodocumento_1.getTipodocumentos);
router.get('/:id', validar_jwt_1.validarJWT, tipodocumento_1.getTipodocumento);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tipodocumento_1.postTipodocumentos);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tipodocumento_1.putTipodocumentos);
router.delete('/:id', validar_jwt_1.validarJWT, tipodocumento_1.deleteTipodocumentos);
exports.default = router;
//# sourceMappingURL=tipodocumento.js.map