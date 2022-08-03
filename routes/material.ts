/*
    path: /api/materiales
*/
import { Router } from 'express';
import { check } from 'express-validator';
import {
busquedaMateriales, busquedaMaterialesProgramacion, deleteMaterial, getMaterial,
getMateriales, getMaterialesProgramacion, getTodo, 
materialesProgramacion, postMaterial, putMaterial
} from '../controllers/material';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getMateriales);
router.get('/:id', validarJWT, getMaterial);
router.get('/busqueda/:valor', validarJWT, busquedaMateriales);
router.get('/programacion/:programacion',validarJWT,getMaterialesProgramacion);
router.get('/programacion/:programacionId',validarJWT,materialesProgramacion);
router.get('/busqueda/programacion/:programacionId/:valor', validarJWT, busquedaMaterialesProgramacion);

router.post('/', [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validarCampos
], postMaterial);

router.put('/:id', [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validarCampos
], putMaterial);

router.delete('/:id', validarJWT, deleteMaterial);

export default router;