"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/competencias
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const competencia_1 = require("../controllers/competencia");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, competencia_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, competencia_1.getCompetencias);
router.get('/:id', validar_jwt_1.validarJWT, competencia_1.getCompetencia);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, competencia_1.busquedaCompetencias);
router.get('/porcompetencia/:areaId', validar_jwt_1.validarJWT, competencia_1.getCompetenciasPorArea);
router.get('/existenotas/:competenciaId', validar_jwt_1.validarJWT, competencia_1.getExistenNotas);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('areaId', 'El area es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], competencia_1.postCompetencia);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('areaId', 'El area es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], competencia_1.putCompetencia);
router.delete('/:id', validar_jwt_1.validarJWT, competencia_1.deleteCompetencia);
exports.default = router;
//# sourceMappingURL=competencia.js.map