"use strict";
/*
    path: /api/areas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const area_1 = require("../controllers/area");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, area_1.getTodo);
router.get('/competencias', validar_jwt_1.validarJWT, area_1.getTodoCompetencias);
router.get('/', validar_jwt_1.validarJWT, area_1.getAreas);
router.get('/:id', validar_jwt_1.validarJWT, area_1.getArea);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, area_1.busquedaAreas);
router.get('/nombrerepetido/:areaNombre', validar_jwt_1.validarJWT, area_1.nombreRepetido);
router.get('/nombrerepetidoeditar/:areaId/:areaNombre', validar_jwt_1.validarJWT, area_1.nombreRepetidoEditar);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], area_1.postArea);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], area_1.putArea);
router.delete('/:id', validar_jwt_1.validarJWT, area_1.deleteArea);
exports.default = router;
//# sourceMappingURL=area.js.map