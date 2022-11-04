/*
    path: /api/usuarios
*/

import  { Router } from 'express';
import  { check } from 'express-validator';

import { actualizarPassword, busquedaUsuarios, busquedaUsuariosPorRol, deleteUsuario, emailRepetido, getUsuario, getUsuarioAreas, getUsuarios, getUsuariosLimitado, getUsuariosPorRol, getUsuariosTodos, habilitarDesabilitarUsuario, obtenerUsuarioEmail, postUsuario, putUsuario } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT, getUsuarios);
router.get('/porrol/:rolId', validarJWT, getUsuariosPorRol);

router.get('/filtrado/todo',validarJWT, getUsuariosTodos);
router.get('/limitado',validarJWT, getUsuariosLimitado);

router.get('/:id',validarJWT,getUsuario);
router.get('/:id/areas',validarJWT,getUsuarioAreas);

router.post('/consultaporemail',[ 
    validarJWT,
    check('email','El email es obligatorio').not().isEmpty(),
], obtenerUsuarioEmail);


router.post('/verificar/email',[ 
    validarJWT,
    check('email','El email es obligatorio').not().isEmpty(),
], emailRepetido);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('roleId','El campo rol es obligatorio').not().isEmpty(),
    check('personaId','El campo persona es obligatorio').not().isEmpty(),
    validarCampos
],postUsuario);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('personaId','El campo persona es obligatorio').not().isEmpty(),
    validarCampos
] ,putUsuario);

router.put('/password/:id',[
    validarJWT,
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],actualizarPassword);

router.patch('/habilitar/:id',[
    validarJWT,
    check('accion','El campo accion es obligatorio').not().isEmpty(),
], habilitarDesabilitarUsuario);

router.delete('/:id', validarJWT ,deleteUsuario);

router.get('/busqueda/:valor',validarJWT,busquedaUsuarios);
router.get('/busqueda/porrol/:rolId/:valor',validarJWT,busquedaUsuariosPorRol);

export default router;