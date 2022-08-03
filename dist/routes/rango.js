"use strict";
/*
    path: /api/rangos
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const rango_1 = require("../controllers/rango");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, rango_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, rango_1.getRangos);
router.get('/:id', validar_jwt_1.validarJWT, rango_1.getRango);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, rango_1.busquedaRangos);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('letra', 'La letra es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('inicio', 'El inicio es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fin', 'El fin es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('color', 'El color es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('alias', 'El alias es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], rango_1.postRango);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('letra', 'La letra es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('inicio', 'El inicio es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fin', 'El fin es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('color', 'El color es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('alias', 'El alias es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], rango_1.putRango);
router.delete('/:id', validar_jwt_1.validarJWT, rango_1.deleteRango);
exports.default = router;
//# sourceMappingURL=rango.js.map