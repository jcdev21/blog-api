import BaseRouter from '../BaseRouter';
import ClientBlogController from '../../controllers/client/ClientBlogController';

class ClientBlogRoutes extends BaseRouter {
    public routes(): void {
        this.router.get('/', ClientBlogController.index);
        this.router.get('/:id', ClientBlogController.show);
    }
}

export default new ClientBlogRoutes().router;