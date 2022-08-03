/*
    path: /api/rangos
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaRangos, deleteRango, getRango, getRangos, getTodo, postRango, putRango } from '../controllers/rango';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getRangos);
router.get('/:id',validarJWT,getRango);
router.get('/busqueda/:valor',validarJWT,busquedaRangos);

router.post('/',[
    validarJWT,
    check('letra','La letra es obligatoria').not().isEmpty(),
    check('inicio','El inicio es obligatorio').not().isEmpty(),
    check('fin','El fin es obligatorio').not().isEmpty(),
    check('color','El color es obligatorio').not().isEmpty(),
    check('alias','El alias es obligatorio').not().isEmpty(),
    validarCampos
],postRango);

 router.put('/:id',[
    validarJWT,
    check('letra','La letra es obligatoria').not().isEmpty(),
    check('inicio','El inicio es obligatorio').not().isEmpty(),
    check('fin','El fin es obligatorio').not().isEmpty(),
    check('color','El color es obligatorio').not().isEmpty(),
    check('alias','El alias es obligatorio').not().isEmpty(),
    validarCampos
 ],putRango);
 
 router.delete('/:id',validarJWT,deleteRango);

export default router;