import BaseRouter from '../BaseRouter';
import TestingController from '../../controllers/client/TestingController';

class ClientBlogRoutes extends BaseRouter {
    public routes(): void {
        this.router.get('/', TestingController.index);
    }
}

export default new ClientBlogRoutes().router;