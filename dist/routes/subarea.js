"use strict";
/*
    path: /api/subareas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const subarea_1 = require("../controllers/subarea");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, subarea_1.getTodo);
router.get('/area/:id', validar_jwt_1.validarJWT, subarea_1.getSubareasArea);
router.get('/', validar_jwt_1.validarJWT, subarea_1.getSubareas);
router.get('/:id', validar_jwt_1.validarJWT, subarea_1.getSubarea);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, subarea_1.busquedaSubareas);
router.get('/tieneprogramaciones/:subareaId', validar_jwt_1.validarJWT, subarea_1.tieneProgramaciones);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], subarea_1.postSubarea);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], subarea_1.putSubarea);
router.delete('/:id', validar_jwt_1.validarJWT, subarea_1.deleteSubarea);
exports.default = router;
//# sourceMappingURL=subarea.js.map