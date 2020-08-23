import BaseRouter from './BaseRouter';
import { auth, adminAccess } from '../middlewares/AuthMiddleware';
import { validate, updateValidate } from '../middlewares/UserValidator';
import multer from 'multer';
import storage from '../middlewares/MulterMiddleware';

import UserController from '../controllers/UserController';

const mimetypeImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
const upload = multer({ 
    storage,
    limits: {fileSize: 1024 * 1024 * 0.4 },
    fileFilter: (req, file, cb) => {
        if (mimetypeImage.indexOf(file.mimetype) !== -1) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

class UserRoutes extends BaseRouter {
    public routes(): void {
        this.router.get('/', auth, adminAccess, UserController.index);
        this.router.post('/', upload.single('photo'), validate, UserController.create);
        this.router.get('/:id', auth, adminAccess, UserController.show);
        this.router.put('/:id', auth, adminAccess, updateValidate, UserController.update);
        this.router.delete('/:id', auth, adminAccess, UserController.delete);
        this.router.put('/:id/change-foto', auth, upload.single('photo'), UserController.changeFoto);
        
        // upload cara 1
        this.router.post('/upload', auth, adminAccess, upload.single('photo'), validate, UserController.upload);
        // multifile
        this.router.post('/upload-multifile', auth, adminAccess, upload.array('files', 3), UserController.uploadMultiFile);

        // upload cara 2
        // this.router.post('/upload', validate, UserController.uploadDua);
        // this.router.post('/upload_foto', upload.single('photo'), UserController.uploadFoto);


        /**
         * Mengatasi masalah upload : (belum efektif)
         *  1. dengan 1 endpoit, cuma file akan terupload lebih dahulu, sebelum data divalidasi
         *  - memakai cara 1, cuma file di simpan sementara dulu, nanti tergantung validasi, 
         *     kalau gagal hapus file
         *  2. membuat 2 endpoit, pertama untuk data string lalu di then frontend, akses endpoit upload file,
         *     berarti di endpoit pertama harus mengembalikan data baru melalui response
         */
    }
}

export default new UserRoutes().router;