"use strict";
/*
    path: /api/horas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const hora_1 = require("../controllers/hora");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, hora_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, hora_1.getHoras);
router.get('/:id', validar_jwt_1.validarJWT, hora_1.getHora);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, hora_1.busquedaHoras);
router.get('/tienehorarios/:horaId', validar_jwt_1.validarJWT, hora_1.tieneHorarios);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('inicio', 'El inicio es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fin', 'El fin es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], hora_1.postHora);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('inicio', 'El inicio es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fin', 'El fin es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], hora_1.putHora);
router.delete('/:id', validar_jwt_1.validarJWT, hora_1.deleteHora);
exports.default = router;
//# sourceMappingURL=hora.js.map