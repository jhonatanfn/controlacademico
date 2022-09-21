"use strict";
/*
    path: /api/periodos
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const periodo_1 = require("../controllers/periodo");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, periodo_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, periodo_1.getPeriodos);
router.get('/:id', validar_jwt_1.validarJWT, periodo_1.getPeriodo);
router.get('/consulta/:nombre', validar_jwt_1.validarJWT, periodo_1.getPeriodoNombre);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, periodo_1.busquedaPeriodos);
router.get('/tieneprogramaciones/:periodoId', validar_jwt_1.validarJWT, periodo_1.tieneProgramaciones);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechainicial', 'La fecha inicial es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechafinal', 'La fecha final es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], periodo_1.postPeriodo);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechainicial', 'La fecha inicial es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechafinal', 'La fecha final es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], periodo_1.putPeriodo);
router.delete('/:id', validar_jwt_1.validarJWT, periodo_1.deletePeriodo);
exports.default = router;
//# sourceMappingURL=periodo.js.map