"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/materiales
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const material_1 = require("../controllers/material");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, material_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, material_1.getMateriales);
router.get('/:id', validar_jwt_1.validarJWT, material_1.getMaterial);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, material_1.busquedaMateriales);
router.get('/programacion/:programacion', validar_jwt_1.validarJWT, material_1.getMaterialesProgramacion);
router.get('/programacion/:programacionId', validar_jwt_1.validarJWT, material_1.materialesProgramacion);
router.get('/busqueda/programacion/:programacionId/:valor', validar_jwt_1.validarJWT, material_1.busquedaMaterialesProgramacion);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], material_1.postMaterial);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], material_1.putMaterial);
router.delete('/:id', validar_jwt_1.validarJWT, material_1.deleteMaterial);
exports.default = router;
//# sourceMappingURL=material.js.map