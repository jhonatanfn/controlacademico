/*
    path: /api/horarios
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaHorarios, busquedaHorariosPorDia, deleteHorario, existeHorario, getHorario, getHorarios, 
    getHorariosPorDia, getTodo, horarioduplicado, horarioregistrado, horariosPeriodoAula, 
    horariosPeriodoDocente, postHorario, putHorario } from '../controllers/horario';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/',validarJWT,getHorarios);
router.get('/pordia/:diaNombre',validarJWT,getHorariosPorDia);
router.get('/:id',validarJWT,getHorario);
router.get('/busqueda/:valor',validarJWT,busquedaHorarios);
router.get('/busqueda/pordia/:diaNombre/:valor',validarJWT,busquedaHorariosPorDia);

router.get('/existehorario/:periodoId/:aulaId/:diaNombre/:horaId',validarJWT,existeHorario);
router.get('/hayhorario/:periodoId/:aulaId',validarJWT,horarioregistrado);
router.get('/horarioduplicado/:periodoId/:aulaId/:areaId/:dia/:horaId',validarJWT,horarioduplicado);
router.get('/periodoaula/:periodoId/:aulaId',validarJWT,horariosPeriodoAula);
router.get('/periododocente/:periodoId/:docenteId',validarJWT,horariosPeriodoDocente);

router.post('/',[
    validarJWT,
    check('dia','El dia es obligatorio').not().isEmpty(),
    check('programacionId','La programacion es obligatoria').not().isEmpty(),
    check('horaId','La hora es obligatoria').not().isEmpty(),
    validarCampos
],postHorario);

 router.put('/:id',[
    validarJWT,
    check('dia','El dia es obligatorio').not().isEmpty(),
    check('programacionId','La programacion es obligatoria').not().isEmpty(),
    check('horaId','La hora es obligatoria').not().isEmpty(),
    validarCampos
 ],putHorario);
 
 router.delete('/:id',validarJWT,deleteHorario);

export default router;