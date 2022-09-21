/*
    path: /api/asistencias
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { asistenciasPorMatricula, asistenciasPorMatriculaRango, deleteAsistencia, existeAsistencia, 
    existeAsistenciaProgramacionFecha, 
    getAsistencia, getAsistencias, 
    getAsistenciasAlumno, 
    getAsistenciasHoy, 
    getAsistenciasPeriodo, 
    getAsistenciasPeriodoAula, 
    getAsistenciasPeriodoAulaRango,  
    getAsistenciasPeriodoAulaRangoAlumno,  
    getAsistenciasPeriodoAulaSubareaFecha, 
    getAsistenciasPeriodoAulaSubareaFechaApoderado, 
    getAsistenciasProgramacionFecha, 
    getAsistenciasRango, 
    getAsistenciasRangoApoderado, 
    getAsistenciasRangoMatricula, 
getTodo, listadoAsistencias, postAsistencia, putAsistencia } from '../controllers/asistencia';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getAsistencias);
router.get('/:id', validarJWT, getAsistencia);
router.get('/asistencia/existeasistencia/:periodoId/:aulaId/:fecha', validarJWT,existeAsistencia);
router.get('/asistencia/listado/:periodoId/:aulaId/:fecha', validarJWT,listadoAsistencias);
router.get('/parahoyasistencias/periodofecha/:periodoId/:fecha', validarJWT, getAsistenciasHoy);
router.get('/consultaalumno/:periodoId/:aulaId/:alumnoId/:fechainicial/:fechafinal', validarJWT, getAsistenciasAlumno);

router.get('/programacion/fecha/:programacionId/:fecha',
validarJWT,getAsistenciasProgramacionFecha);
router.get('/matricula/fecha/:id/:fechainicial',validarJWT,asistenciasPorMatricula);
router.get('/asistencia/existe/:programacionId/:fecha', validarJWT,existeAsistenciaProgramacionFecha);
router.get('/obtenerasistencias/:periodoId/:aulaId/:subareaId/:fecha', 
validarJWT,getAsistenciasPeriodoAulaSubareaFecha);
router.get('/matricula/rangofecha/:matriculaId/:fechainicial/:fechafinal',validarJWT,asistenciasPorMatriculaRango);
router.get('/rangomatricula/:periodoId/:aulaId/:subareaId/:matriculaId/:fechainicial/:fechafinal', 
validarJWT, getAsistenciasRangoMatricula);
router.get('/obtenerasistenciasapoderado/:periodoId/:aulaId/:subareaId/:fecha/:apoderadoId', 
validarJWT,getAsistenciasPeriodoAulaSubareaFechaApoderado);
router.get('/rangoapoderado/:periodoId/:aulaId/:subareaId/:fechainicial/:fechafinal/:apoderadoId', 
validarJWT,getAsistenciasRangoApoderado);

router.get('/rango/:periodoId/:aulaId/:fechainicial/:fechafinal', 
validarJWT,getAsistenciasRango);
router.get('/porperiodo/:periodoId', validarJWT, getAsistenciasPeriodo);
router.get('/reportedos/porperiodoaula/:periodoId/:aulaId', validarJWT, getAsistenciasPeriodoAula);
router.get('/reportetres/porperiodoaularango/:periodoId/:aulaId/:fechainicial/:fechafinal', validarJWT, 
getAsistenciasPeriodoAulaRango);
router.get('/porperiodoaularangoalumno/:periodoId/:aulaId/:fechainicial/:fechafinal/:alumnoId', validarJWT, 
getAsistenciasPeriodoAulaRangoAlumno);


router.post('/', [
    validarJWT,
    check('matriculadetalleId', 'La matriculadetalle es obligatorio').not().isEmpty(),
    check('situacionId', 'La situacion es obligatorio').not().isEmpty(),
    validarCampos
], postAsistencia);

router.put('/:id', [
    validarJWT,
    check('matriculadetalleId', 'La matriculadetalle es obligatorio').not().isEmpty(),
    check('situacionId', 'La situacion es obligatorio').not().isEmpty(),
    validarCampos
], putAsistencia);

router.delete('/:id', validarJWT, deleteAsistencia);

export default router;