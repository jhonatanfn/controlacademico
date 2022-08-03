/*
    path: /api/programaciones
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaProgramaciones, deleteProgramacion, 
    existeProgramacion, getProgramacion, getProgramaciones, 
getProgramacionesPeriodoAula, postProgramacion, putProgramacion,
getProgramacionesDocente, perteneceProgramacionDocente,
getProgramacionesDocentePeriodo,
programacionPeriodo,
busquedaProgramacionesSubarea,
busquedaProgramacionesSubareaPorDocente,
programacionPeriodoPaginado,
busquedaProgramacionesPorDocente,
getProgramacionesDocentePeriodoPaginado,
busquedaProgramacionesSubareaPorDocentePeriodo,
getProgramacionesAdministrador,
getProgramacionesAdministradorPeriodo} from '../controllers/programacion';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/',validarJWT,getProgramaciones);
router.get('/:id',validarJWT,getProgramacion);
router.get('/periodo/aula/:periodoid/:aulaid',validarJWT,getProgramacionesPeriodoAula);
router.get('/busqueda/:valor',validarJWT,busquedaProgramaciones);
router.get('/busqueda/subarea/:valor',validarJWT,busquedaProgramacionesSubarea);
router.get('/existe/:periodo/:aula/:subarea',validarJWT,existeProgramacion);
router.get('/docente/:docente',validarJWT,getProgramacionesDocente);
router.get('/docente/periodo/:docente/:periodo',validarJWT,getProgramacionesDocentePeriodo);
router.get('/pertenece/:programacionId/:docenteId',validarJWT,perteneceProgramacionDocente);
router.get('/periodo/:id',validarJWT,programacionPeriodo);
router.get('/busqueda/pordocente/:docenteId/:valor',validarJWT,busquedaProgramacionesSubareaPorDocente);
router.get('/busqueda/pordocenteperiodo/:docenteId/:periodoId/:valor',validarJWT,busquedaProgramacionesSubareaPorDocentePeriodo);
router.get('/periodopaginado/:id',validarJWT,programacionPeriodoPaginado);
router.get('/busqueda/docente/:valor',validarJWT,busquedaProgramacionesPorDocente);
router.get('/docente/periodopaginado/:docente/:periodo',validarJWT,getProgramacionesDocentePeriodoPaginado);

router.get('/busqueda/administradorperiodo/:periodoId/:valor',validarJWT,getProgramacionesAdministradorPeriodo);
router.get('/busqueda/administrador/:valor',validarJWT,getProgramacionesAdministrador);

router.post('/',[
    validarJWT,
    check('periodoId','El periodo es obligatorio').not().isEmpty(),
    check('aulaId','El aula es obligatorio').not().isEmpty(),
    check('subareaId','El subarea es obligatorio').not().isEmpty(),
    check('docenteId','El docente es obligatorio').not().isEmpty(),
    validarCampos
],postProgramacion);
 router.put('/:id',[
    validarJWT,
    check('periodoId','El periodo es obligatorio').not().isEmpty(),
    check('aulaId','El aula es obligatorio').not().isEmpty(),
    check('subareaId','El subarea es obligatorio').not().isEmpty(),
    check('docenteId','El docente es obligatorio').not().isEmpty(),
    validarCampos
 ],putProgramacion);
 router.delete('/:id',validarJWT,deleteProgramacion);

export default router;