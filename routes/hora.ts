/*
    path: /api/horas
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaHoras, deleteHora, getHora, 
getHoras, getTodo, postHora, putHora, tieneHorarios } from '../controllers/hora';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getHoras);
router.get('/:id',validarJWT,getHora);
router.get('/busqueda/:valor',validarJWT,busquedaHoras);
router.get('/tienehorarios/:horaId',validarJWT,tieneHorarios);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('inicio','El inicio es obligatorio').not().isEmpty(),
    check('fin','El fin es obligatorio').not().isEmpty(),
    validarCampos
],postHora);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('inicio','El inicio es obligatorio').not().isEmpty(),
    check('fin','El fin es obligatorio').not().isEmpty(),
    validarCampos
 ],putHora);
 router.delete('/:id',validarJWT,deleteHora);

export default router;