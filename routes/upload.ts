/*
    ruta: /api/uploads
*/

import { Router } from 'express';
import  expressFileUpload  from 'express-fileupload';
import { validarJWT } from '../middlewares/validar-jwt';
import { fileUploadCloudinary, fileUploadCloudinaryArea, 
fileUploadCloudinaryInstitucion, 
fileUploadPdf, retornaImagen, retornaImagenInstitucion } from '../controllers/upload';

const router= Router();
router.use(expressFileUpload());

router.put('/:id',validarJWT,fileUploadCloudinary);
router.put('/area/:id',validarJWT,fileUploadCloudinaryArea);
router.get('/:foto',retornaImagen);
router.get('/colegio/:foto',retornaImagenInstitucion);
router.put('/material/:id',validarJWT,fileUploadPdf);
router.put('/institucion/logo/:id',validarJWT,fileUploadCloudinaryInstitucion);

export default router;