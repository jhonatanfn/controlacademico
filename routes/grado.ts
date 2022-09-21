/*
    path: /api/grados
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaGrados, deleteGrado, getGrado, getGrados, getTodo, nombreRepetido, nombreRepetidoEditar, postGrado, putGrado, tieneAulas } from '../controllers/grado';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getGrados);
router.get('/:id',validarJWT,getGrado);
router.get('/busqueda/:valor',validarJWT,busquedaGrados);
router.get('/tieneaulas/:gradoId',validarJWT,tieneAulas);
router.get('/nombrerepetido/:gradoNombre',validarJWT,nombreRepetido)
router.get('/nombrerepetidoeditar/:gradoId/:gradoNombre',validarJWT,nombreRepetidoEditar)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postGrado);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putGrado);
 router.delete('/:id',validarJWT,deleteGrado);

export default router;