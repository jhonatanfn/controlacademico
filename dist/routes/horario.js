"use strict";
/*
    path: /api/horarios
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const horario_1 = require("../controllers/horario");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, horario_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, horario_1.getHorarios);
router.get('/pordia/:diaNombre', validar_jwt_1.validarJWT, horario_1.getHorariosPorDia);
router.get('/:id', validar_jwt_1.validarJWT, horario_1.getHorario);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, horario_1.busquedaHorarios);
router.get('/busqueda/pordia/:diaNombre/:valor', validar_jwt_1.validarJWT, horario_1.busquedaHorariosPorDia);
router.get('/existehorario/:periodoId/:aulaId/:diaNombre/:horaId', validar_jwt_1.validarJWT, horario_1.existeHorario);
router.get('/hayhorario/:periodoId/:aulaId', validar_jwt_1.validarJWT, horario_1.horarioregistrado);
router.get('/horarioduplicado/:periodoId/:aulaId/:areaId/:dia/:horaId', validar_jwt_1.validarJWT, horario_1.horarioduplicado);
router.get('/periodoaula/:periodoId/:aulaId', validar_jwt_1.validarJWT, horario_1.horariosPeriodoAula);
router.get('/periododocente/:periodoId/:docenteId', validar_jwt_1.validarJWT, horario_1.horariosPeriodoDocente);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('dia', 'El dia es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('programacionId', 'La programacion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('horaId', 'La hora es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], horario_1.postHorario);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('dia', 'El dia es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('programacionId', 'La programacion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('horaId', 'La hora es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], horario_1.putHorario);
router.delete('/:id', validar_jwt_1.validarJWT, horario_1.deleteHorario);
exports.default = router;
//# sourceMappingURL=horario.js.map