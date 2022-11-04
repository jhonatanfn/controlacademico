/*
    path: /api/apreciaciones
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { busquedaApreciaciones, deleteApreciacion, getApreciacion, getApreciaciones, 
getApreciacionesPeriodoAlumno, getTodo, postApreciacion, putApreciacion } from '../controllers/apreciacion';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getApreciaciones);
router.get('/:id', validarJWT, getApreciacion);
router.get('/busqueda/:valor', validarJWT, busquedaApreciaciones);
router.get('/alumno/:periodoId/:alumnoId',validarJWT,getApreciacionesPeriodoAlumno);

router.post('/', [
    validarJWT,
    check('periodoId', 'El periodo es obligatorio').not().isEmpty(),
    check('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validarCampos
], postApreciacion);

router.put('/:id', [
    validarJWT,
    check('periodoId', 'El periodo es obligatorio').not().isEmpty(),
    check('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validarCampos
], putApreciacion);

router.delete('/:id', validarJWT, deleteApreciacion);

export default router;