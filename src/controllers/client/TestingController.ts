import { Request, Response } from 'express';
import ClientBlogService from '../../services/client/ClientBlogService';

class TestingController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service = new ClientBlogService(req);
        const blogs = await service.getAll();

        return res.send({
            data: blogs.rows,
            totalResults: blogs.count,
            msg: ''
        });
    }
}

export default new TestingController;