/*
    path: /api/tipodocumentos
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaNiveles, deleteNivel, getNivel, getNiveles, getTodo, nombreRepetido, nombreRepetidoEditar, postNivel, putNivel, tieneAulas } from '../controllers/nivel';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getNiveles);
router.get('/:id',validarJWT,getNivel);
router.get('/busqueda/:valor',validarJWT,busquedaNiveles);
router.get('/tieneaulas/:nivelId',validarJWT,tieneAulas);
router.get('/nombrerepetido/:nivelNombre',validarJWT,nombreRepetido)
router.get('/nombrerepetidoeditar/:nivelId/:nivelNombre',validarJWT,nombreRepetidoEditar)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postNivel);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putNivel);
 router.delete('/:id',validarJWT,deleteNivel);

export default router;