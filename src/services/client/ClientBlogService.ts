import { Request } from 'express';
const db = require('../../db/models');

class ClientBlogService {
    params: Request['params'];
    query: Request['query'];

    constructor(req: Request) {
        this.params = req.params;
        this.query = req.query;
    }

    getAll = async () => {

        // menghitung jumlah pagination, jika ingin membuat pagination
        /**
            const resultTotal = await db.blog.count();
            const pageCount = Math.ceil(resultTotal / limit);
            console.log('total page : ' + pageCount);
         */
        
        const limit = 2;
        const { pages } = this.query;
        const pageNumber: number = Number(pages) || 1;
        const offset = (pageNumber - 1) * limit;

        const blogs = await db.blog.findAndCountAll({
            attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at'],
            offset: offset,
            limit: limit,
            order: [
                ['id', 'DESC']
            ],
        });

        return blogs;
    }

    getOne = async () => {
        const { id } = this.params;

        const blog = await db.blog.findOne({
            where: { id },
            attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
        });

        return blog;
    }
}

export default ClientBlogService;