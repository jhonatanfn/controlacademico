/*
    path: /api/subareas
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaSubareas, deleteSubarea, getSubarea, getSubareas, 
getSubareasArea, getTodo, postSubarea, putSubarea, tieneProgramaciones } from '../controllers/subarea';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/area/:id',validarJWT,getSubareasArea);
router.get('/',validarJWT,getSubareas);
router.get('/:id',validarJWT,getSubarea);
router.get('/busqueda/:valor',validarJWT,busquedaSubareas);
router.get('/tieneprogramaciones/:subareaId',validarJWT,tieneProgramaciones);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postSubarea);

 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putSubarea);

 router.delete('/:id',validarJWT,deleteSubarea);

export default router;