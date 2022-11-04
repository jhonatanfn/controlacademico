"use strict";
/*
    path: /api/apreciaciondetalles
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apreciaciondetalle_1 = require("../controllers/apreciaciondetalle");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, apreciaciondetalle_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, apreciaciondetalle_1.getApreciaciondetalles);
router.get('/:id', validar_jwt_1.validarJWT, apreciaciondetalle_1.getApreciaciondetalle);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, apreciaciondetalle_1.busquedaApreciaciondetalles);
router.get('/periodo/alumno/:periodoId/:alumnoId', validar_jwt_1.validarJWT, apreciaciondetalle_1.getApreciaciondetallesPeriodoAlumno);
router.get('/apreciacion/:apreciacionId', validar_jwt_1.validarJWT, apreciaciondetalle_1.getApreciaciondetallesApreciacion);
router.post('/', [
    validar_jwt_1.validarJWT,
    validar_campos_1.validarCampos
], apreciaciondetalle_1.postApreciaciondetalle);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    validar_campos_1.validarCampos
], apreciaciondetalle_1.putApreciaciondetalle);
router.delete('/:id', validar_jwt_1.validarJWT, apreciaciondetalle_1.deleteApreciaciondetalle);
exports.default = router;
//# sourceMappingURL=apreciaciondetalle.js.map