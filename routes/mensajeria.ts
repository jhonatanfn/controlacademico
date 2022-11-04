/*
    path: /api/mensajerias
*/
import { Router } from 'express';
import { check } from 'express-validator';
import {actualizarMensajesNuevos, busquedaMensajeriasEliminados, busquedaMensajeriasEnviados, busquedaMensajeriasRecibidos, deleteMensajeriaEmisor, deleteMensajeriaReceptor, existenMensajesNuevos, getMensajeria, 
    getMensajerias, getMensajeriasEliminados, getMensajeriasEnviados, 
    getMensajeriasRecibidos, getTodo, leidoMensajeriaEmisor, leidoMensajeriaReceptor, 
    noleidoMensajeriaEmisor, noleidoMensajeriaReceptor, postMensajeria, putMensajeria, restaurarEmisor, restaurarReceptor } 
from '../controllers/mensajeria';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getMensajerias);
router.get('/:id', validarJWT, getMensajeria);

router.get('/busqueda/busquedarecibidos/:valor/:email', validarJWT, busquedaMensajeriasRecibidos);
router.get('/busqueda/busquedaenviados/:valor/:email', validarJWT, busquedaMensajeriasEnviados);
router.get('/busqueda/busquedaeliminados/:valor/:email', validarJWT, busquedaMensajeriasEliminados);

router.post('/leidoemisor/marcarleido/:id', validarJWT, leidoMensajeriaEmisor);
router.post('/leidoreceptor/marcarleido/:id', validarJWT, leidoMensajeriaReceptor);

router.post('/noleidoemisor/marcarnoleido/:id', validarJWT, noleidoMensajeriaEmisor);
router.post('/noleidoreceptor/marcarnoleido/:id', validarJWT, noleidoMensajeriaReceptor);

router.get('/emisor/restauraremisor/paraemisor/:id', validarJWT, restaurarEmisor);
router.get('/receptor/restaurarreceptor/parareceptor/:id', validarJWT, restaurarReceptor);

router.get('/receptor/nuevos/:email', validarJWT, existenMensajesNuevos);
router.get('/receptor/actualizar/nuevos/:email', validarJWT, actualizarMensajesNuevos);

router.post('/recibidos',[
    validarJWT,
    check('email', 'El receptor es obligatorio').not().isEmpty(),
    validarCampos
],getMensajeriasRecibidos);

router.post('/enviados',[
    validarJWT,
    check('email', 'El emisor es obligatorio').not().isEmpty(),
    validarCampos
],getMensajeriasEnviados);

router.post('/eliminados',[
    validarJWT,
    check('email', 'El emisor o receptor es obligatorio').not().isEmpty(),
    validarCampos
],getMensajeriasEliminados);

router.post('/', [
    validarJWT,
    check('emisor', 'El emisor es obligatorio').not().isEmpty(),
    check('receptor', 'La receptor es obligatorio').not().isEmpty(),
    check('asunto', 'El asunto es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    validarCampos
], postMensajeria);

router.put('/:id', [
    validarJWT,
    check('emisor', 'El emisor es obligatorio').not().isEmpty(),
    check('receptor', 'La receptor es obligatorio').not().isEmpty(),
    check('asunto', 'El asunto es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    validarCampos
], putMensajeria);

router.post('/deleteemisor/:id', [
    validarJWT,
    check('emisor', 'El emisor es obligatorio').not().isEmpty(),
    validarCampos,
], deleteMensajeriaEmisor);
router.post('/deletereceptor/:id', [
    validarJWT,
    check('receptor', 'El receptor es obligatorio').not().isEmpty(),
    validarCampos,
], deleteMensajeriaReceptor);


export default router;