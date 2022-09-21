/*
    path: /api/competencias
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { busquedaCompetencias, deleteCompetencia, getCompetencia, 
getCompetencias, getCompetenciasPorArea, getExistenNotas, getTodo, postCompetencia, putCompetencia } from '../controllers/competencia';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();
router.get('/todo', validarJWT, getTodo);
router.get('/', validarJWT, getCompetencias);
router.get('/:id', validarJWT, getCompetencia);
router.get('/busqueda/:valor', validarJWT, busquedaCompetencias);
router.get('/porcompetencia/:areaId',validarJWT,getCompetenciasPorArea);
router.get('/existenotas/:competenciaId',validarJWT,getExistenNotas);
router.post('/', [
    validarJWT,
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('areaId', 'El area es obligatoria').not().isEmpty(),
    validarCampos
], postCompetencia);
router.put('/:id', [
    validarJWT,
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('areaId', 'El area es obligatoria').not().isEmpty(),
    validarCampos
], putCompetencia);
router.delete('/:id', validarJWT, deleteCompetencia);

export default router;