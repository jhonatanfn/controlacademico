"use strict";
/*
    path: /api/pdfs
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdf_1 = require("../controllers/pdf");
const router = (0, express_1.Router)();
router.get('/', pdf_1.generarPdf);
exports.default = router;
//# sourceMappingURL=pdf.js.map