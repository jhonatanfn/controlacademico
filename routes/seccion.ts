/*
    path: /api/secciones
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaSecciones, deleteSeccion, getSeccion, getSecciones, getTodo, nombreRepetido, nombreRepetidoEditar, postSeccion, putSeccion, tieneAulas } from '../controllers/seccion';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getSecciones);
router.get('/:id',validarJWT,getSeccion);
router.get('/busqueda/:valor',validarJWT,busquedaSecciones);
router.get('/tieneaulas/:seccionId',validarJWT,tieneAulas);
router.get('/nombrerepetido/:seccionNombre',validarJWT,nombreRepetido)
router.get('/nombrerepetidoeditar/:seccionId/:seccionNombre',validarJWT,nombreRepetidoEditar)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postSeccion);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putSeccion);
 router.delete('/:id',validarJWT,deleteSeccion);

export default router;