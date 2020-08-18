import BaseRouter from './BaseRouter';
import validate from '../middlewares/AuthValidator';
import { authRefreshToken, authLogout } from '../middlewares/AuthMiddleware';

import AuthController from '../controllers/AuthController';

class AuthRoutes extends BaseRouter {
    public routes(): void {
        this.router.post('/login', validate, AuthController.login);
        this.router.get('/refresh-token', authRefreshToken, AuthController.refreshToken);
        this.router.get('/logout', authLogout, AuthController.logout);
    }
}

export default new AuthRoutes().router;