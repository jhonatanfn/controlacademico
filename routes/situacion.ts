/*
    path: /api/situaciones
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaSituaciones, deleteSituacion, getSituacion, getSituaciones, getTodo, postSituacion, putSituacion } 
from '../controllers/situacion';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getSituaciones);
router.get('/:id',validarJWT,getSituacion);
router.get('/busqueda/:valor',validarJWT,busquedaSituaciones);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('abreviatura','La abreviatura es obligatorio').not().isEmpty(),
    validarCampos
],postSituacion);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('abreviatura','La abreviatura es obligatorio').not().isEmpty(),
    validarCampos
 ],putSituacion);
 router.delete('/:id',validarJWT,deleteSituacion);

export default router;