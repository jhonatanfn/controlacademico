/*
    path: /api/apreciaciondetalles
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { busquedaApreciaciondetalles, deleteApreciaciondetalle, getApreciaciondetalle, getApreciaciondetalles, getApreciaciondetallesApreciacion, getApreciaciondetallesPeriodoAlumno, getTodo, postApreciaciondetalle, putApreciaciondetalle } from '../controllers/apreciaciondetalle';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getApreciaciondetalles);
router.get('/:id', validarJWT, getApreciaciondetalle);
router.get('/busqueda/:valor', validarJWT, busquedaApreciaciondetalles);

router.get('/periodo/alumno/:periodoId/:alumnoId', validarJWT, getApreciaciondetallesPeriodoAlumno);
router.get('/apreciacion/:apreciacionId', validarJWT, getApreciaciondetallesApreciacion);

router.post('/', [
    validarJWT,
    validarCampos
], postApreciaciondetalle);

router.put('/:id', [
    validarJWT,
    validarCampos
], putApreciaciondetalle);

router.delete('/:id', validarJWT, deleteApreciaciondetalle);

export default router;