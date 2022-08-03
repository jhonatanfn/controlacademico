"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/ciclos
*/
const express_1 = require("express");
const ciclo_1 = require("../controllers/ciclo");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, ciclo_1.getCiclos);
exports.default = router;
//# sourceMappingURL=ciclo.js.map