/*
    path: /api/asistencias
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { asistenciasPorMatricula, asistenciasPorMatriculaRango, deleteAsistencia, existeAsistenciaProgramacionFecha, 
    getAsistencia, getAsistencias, 
    getAsistenciasPeriodo, 
    getAsistenciasPeriodoAula, 
    getAsistenciasPeriodoAulaArea, 
    getAsistenciasPeriodoAulaAreaSubarea, 
    getAsistenciasPeriodoAulaAreaSubareaCicloAlumno, 
    getAsistenciasPeriodoAulaSubareaFecha, 
    getAsistenciasPeriodoAulaSubareaFechaApoderado, 
    getAsistenciasProgramacionFecha, 
    getAsistenciasRango, 
    getAsistenciasRangoApoderado, 
    getAsistenciasRangoMatricula, 
getTodo, postAsistencia, putAsistencia } from '../controllers/asistencia';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getAsistencias);
router.get('/:id', validarJWT, getAsistencia);
router.get('/programacion/fecha/:programacionId/:fecha',
validarJWT,getAsistenciasProgramacionFecha);
router.get('/matricula/fecha/:id/:fechainicial',validarJWT,asistenciasPorMatricula);
router.get('/asistencia/existe/:programacionId/:fecha', validarJWT,existeAsistenciaProgramacionFecha);
router.get('/obtenerasistencias/:periodoId/:aulaId/:subareaId/:fecha', 
validarJWT,getAsistenciasPeriodoAulaSubareaFecha);
router.get('/matricula/rangofecha/:matriculaId/:fechainicial/:fechafinal',validarJWT,asistenciasPorMatriculaRango);
router.get('/rango/:periodoId/:aulaId/:subareaId/:fechainicial/:fechafinal', 
validarJWT,getAsistenciasRango);
router.get('/rangomatricula/:periodoId/:aulaId/:subareaId/:matriculaId/:fechainicial/:fechafinal', 
validarJWT, getAsistenciasRangoMatricula);
router.get('/obtenerasistenciasapoderado/:periodoId/:aulaId/:subareaId/:fecha/:apoderadoId', 
validarJWT,getAsistenciasPeriodoAulaSubareaFechaApoderado);
router.get('/rangoapoderado/:periodoId/:aulaId/:subareaId/:fechainicial/:fechafinal/:apoderadoId', 
validarJWT,getAsistenciasRangoApoderado);

router.get('/porperiodo/:periodoId', validarJWT, getAsistenciasPeriodo);
router.get('/reportedos/porperiodoaula/:periodoId/:aulaId', validarJWT, getAsistenciasPeriodoAula);
router.get('/reportetres/porperiodoaulaarea/:periodoId/:aulaId/:areaId', validarJWT, getAsistenciasPeriodoAulaArea);
router.get('/porperiodoaulaareasubarea/:periodoId/:aulaId/:areaId/:subareaId', validarJWT, 
getAsistenciasPeriodoAulaAreaSubarea);
router.get('/porperiodoaulaareasubareacicloalumno/:periodoId/:aulaId/:areaId/:subareaId/:alumnoId', validarJWT, 
getAsistenciasPeriodoAulaAreaSubareaCicloAlumno);

router.post('/', [
    validarJWT,
    check('fecha', 'El fecha es obligatorio').not().isEmpty(),
    check('matriculaId', 'La matricula es obligatorio').not().isEmpty(),
    check('situacionId', 'La situacion es obligatorio').not().isEmpty(),
    validarCampos
], postAsistencia);

router.put('/:id', [
    validarJWT,
    check('fecha', 'El fecha es obligatorio').not().isEmpty(),
    check('matriculaId', 'La matricula es obligatorio').not().isEmpty(),
    check('situacionId', 'La situacion es obligatorio').not().isEmpty(),
    validarCampos
], putAsistencia);

router.delete('/:id', validarJWT, deleteAsistencia);

export default router;