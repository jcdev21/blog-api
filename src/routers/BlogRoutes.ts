import BaseRouter from './BaseRouter';
import { auth, userActive } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/BlogValidator';
import multer from 'multer';
import storage from '../middlewares/MulterMiddleware';

import BlogController from '../controllers/BlogController';

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

class BlogRoutes extends BaseRouter {
    public routes(): void {
        this.router.get('/', auth, userActive, BlogController.index);
        this.router.post('/', auth, userActive, upload.single('blog_image'), validate, BlogController.create);
        this.router.get('/:id', auth, userActive, BlogController.show);
        this.router.put('/:id', auth, userActive, upload.single('blog_image'), validate, BlogController.update);
        this.router.delete('/:id', auth, userActive, BlogController.delete);
    }
}

export default new BlogRoutes().router;