/*
    path: /api/areas
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaAreas, deleteArea, getArea, 
getAreas, getTodo, getTodoCompetencias, nombreRepetido, 
nombreRepetidoEditar, postArea, putArea } from '../controllers/area';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/competencias',validarJWT,getTodoCompetencias);
router.get('/',validarJWT,getAreas);
router.get('/:id',validarJWT,getArea);
router.get('/busqueda/:valor',validarJWT,busquedaAreas);
router.get('/nombrerepetido/:areaNombre',validarJWT,nombreRepetido)
router.get('/nombrerepetidoeditar/:areaId/:areaNombre',validarJWT,nombreRepetidoEditar)

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