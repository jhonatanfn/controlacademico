/*
    path: /api/pdfs
*/

import  { Router } from 'express';
import { generarPdf } from '../controllers/pdf';
const router= Router();

router.get('/',generarPdf);



export default router;