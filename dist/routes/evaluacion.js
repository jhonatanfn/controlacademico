"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/evaluaciones
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const evaluacion_1 = require("../controllers/evaluacion");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, evaluacion_1.getEvaluaciones);
router.get('/todo', validar_jwt_1.validarJWT, evaluacion_1.getTodo);
router.get('/:id', validar_jwt_1.validarJWT, evaluacion_1.getEvaluacion);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('abreviatura', 'El abreviatura es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], evaluacion_1.postEvaluacion);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('abreviatura', 'El abreviatura es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], evaluacion_1.putEvaluacion);
router.delete('/:id', validar_jwt_1.validarJWT, evaluacion_1.deleteEvaluacion);
exports.default = router;
//# sourceMappingURL=evaluacion.js.map