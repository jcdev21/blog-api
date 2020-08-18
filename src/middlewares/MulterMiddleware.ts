/**
 * 
 * File MulterMiddleware tidak harus ada, jika upload filenya membutuhkan :
 *  - validasi yang agak ribet ( fileFilter )
 *  - pengaturan destination yang ribet
 * 
 * Jadi solusinya : script multer langsung di tulis di file routes API nya
 * 
 */

import { Request } from 'express';
import multer from 'multer';
const path = require('path');

const uploadFolder = 'uploads/';
const mimetypeImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
const mimetypeDocument = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/msexcel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const storage = multer.diskStorage({
    destination: async function (req: Request, file, cb: Function) {
        if (mimetypeImage.indexOf(file.mimetype) !== -1) {
            await cb(null, uploadFolder + 'images/');
        }

        if (mimetypeDocument.indexOf(file.mimetype) !== -1) {
            await cb(null, uploadFolder + 'documents/');
        }
    },
    filename: async function (req: Request, file, cb: Function) {
        await cb(null, Date.now() + path.extname(file.originalname));
    }
});

// const upload = multer({ storage: storage });
export default storage;