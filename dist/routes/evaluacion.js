"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/evaluaciones
*/
const express_1 = require("express");
const evaluacion_1 = require("../controllers/evaluacion");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, evaluacion_1.getEvaluaciones);
router.get('/todo', validar_jwt_1.validarJWT, evaluacion_1.getTodo);
exports.default = router;
//# sourceMappingURL=evaluacion.js.map