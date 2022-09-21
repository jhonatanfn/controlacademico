/*
    path: /api/aulas
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaAulas, busquedaAulasTotal, deleteAula, existeAula, existeAulaEditar, getAula, getAulaPorNivelGradoSeccion, 
    getAulas, getTodo, postAula, putAula, tieneProgramaciones } from '../controllers/aula';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT,getAulas);
router.get('/todo',validarJWT,getTodo);
router.get('/aula/:nivel/:grado/:seccion',validarJWT,getAulaPorNivelGradoSeccion);
router.get('/busqueda/:valor',validarJWT,busquedaAulas);
router.get('/:id',validarJWT,getAula);
router.get('/busquedatotal/:valor',validarJWT,busquedaAulasTotal);
router.get('/tieneprogramaciones/:aulaId',validarJWT,tieneProgramaciones);

router.get('/existeaula/:nivelId/:gradoId/:seccionId',validarJWT,existeAula);
router.get('/existeaulaeditar/:nivelId/:gradoId/:seccionId/:idAula',validarJWT,existeAulaEditar);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nivelId','El id de la persona es obligatorio').not().isEmpty(),
    check('gradoId','El id de la persona es obligatorio').not().isEmpty(),
    check('seccionId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],postAula);
router.put('/:id',[
    validarJWT,
    check('nivelId','El id de la persona es obligatorio').not().isEmpty(),
    check('gradoId','El id de la persona es obligatorio').not().isEmpty(),
    check('seccionId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putAula);
router.delete('/:id',validarJWT,deleteAula);

export default router;