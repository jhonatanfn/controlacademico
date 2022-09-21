/*
    path: /api/periodos
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { busquedaPeriodos, deletePeriodo, getPeriodo, getPeriodoNombre, getPeriodos, getTodo, postPeriodo, putPeriodo, tieneProgramaciones } from '../controllers/periodo';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getPeriodos);
router.get('/:id', validarJWT, getPeriodo);
router.get('/consulta/:nombre', validarJWT, getPeriodoNombre);
router.get('/busqueda/:valor', validarJWT, busquedaPeriodos);
router.get('/tieneprogramaciones/:periodoId', validarJWT, tieneProgramaciones);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fechainicial', 'La fecha inicial es obligatorio').not().isEmpty(),
    check('fechafinal', 'La fecha final es obligatorio').not().isEmpty(),
    validarCampos
], postPeriodo);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fechainicial', 'La fecha inicial es obligatorio').not().isEmpty(),
    check('fechafinal', 'La fecha final es obligatorio').not().isEmpty(),
    validarCampos
], putPeriodo);
router.delete('/:id', validarJWT, deletePeriodo);

export default router;