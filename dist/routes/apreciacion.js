"use strict";
/*
    path: /api/apreciaciones
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const apreciacion_1 = require("../controllers/apreciacion");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, apreciacion_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, apreciacion_1.getApreciaciones);
router.get('/:id', validar_jwt_1.validarJWT, apreciacion_1.getApreciacion);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, apreciacion_1.busquedaApreciaciones);
router.get('/alumno/:periodoId/:alumnoId', validar_jwt_1.validarJWT, apreciacion_1.getApreciacionesPeriodoAlumno);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('periodoId', 'El periodo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], apreciacion_1.postApreciacion);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('periodoId', 'El periodo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], apreciacion_1.putApreciacion);
router.delete('/:id', validar_jwt_1.validarJWT, apreciacion_1.deleteApreciacion);
exports.default = router;
//# sourceMappingURL=apreciacion.js.map