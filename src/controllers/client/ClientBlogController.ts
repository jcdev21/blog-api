import { Request, Response } from 'express';
import ClientBlogService from '../../services/client/ClientBlogService';

class ClientBlogController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service = new ClientBlogService(req);
        const blogs = await service.getAll();

        return res.send({
            data: blogs.rows,
            totalResults: blogs.count,
            msg: ''
        });
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        const service = new ClientBlogService(req);
        const blog = await service.getOne();

        return res.send({
            data: blog,
            msg: ''
        });
    }
}

export default new ClientBlogController;