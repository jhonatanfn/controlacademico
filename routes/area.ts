/*
    path: /api/areas
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaAreas, deleteArea, getArea, 
getAreas, getTodo, postArea, putArea, tieneSubareas } from '../controllers/area';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getAreas);
router.get('/:id',validarJWT,getArea);
router.get('/busqueda/:valor',validarJWT,busquedaAreas);
router.get('/tienesubareas/:areaId',validarJWT,tieneSubareas);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postArea);

 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putArea);

 router.delete('/:id',validarJWT,deleteArea);

export default router;