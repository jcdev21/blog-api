import { Request, Response } from 'express';
import IController from "./ControllerInterface";
import BlogService from '../services/BlogService';
const fs = require('fs');

class BlogController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service = new BlogService(req);
        const blogs = await service.getAll();

        return res.send({
            data: blogs,
            msg: ''
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const service = new BlogService(req);
        const blog = await service.store();

        return res.send({
            data: blog,
            msg: 'blog created'
        });
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        const service = new BlogService(req);
        const blog = await service.getOne();
        
        return res.send({
            data: blog,
            msg: ''
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const service = new BlogService(req);
        let oldImage: string;
        if (req.file) {
            const oldData = await service.getOne();
            oldImage = oldData.blog_image;
        } else {
            oldImage = '';
        }

        const blog = await service.update();

        if (blog) {
            fs.unlink(oldImage, () => {});

            const data = await service.getOne();

            return res.send({
                data,
                msg: ''
            });
        } else {
            return res.send({
                data: blog,
                msg: 'error'
            });
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const service = new BlogService(req);
        const oldData = await service.getOne();
        const blog = await service.delete();

        if (blog)
            fs.unlink(oldData.blog_image, () => {});

        return res.send({
            data: blog,
            msg: ''
        });
    }
}

export default new BlogController;