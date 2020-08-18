import { Request } from 'express';
const db = require('../db/models');

class BlogService {
    credential: {
        id: number,
        username: string,
        email: string,
        name: string,
        level: string,
        is_active: number
    }
    body: Request['body'];
    params: Request['params'];
    file: Request['file'];

    constructor(req: Request) {
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.file = req.file;
    }

    getAll = async () => {
        if (this.credential.level === 'admin') {
            const blogs = await db.blog.findAll({
                attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
            });

            return blogs;
        } else {
            const blogs = await db.blog.findAll({
                where: { user_id: this.credential.id },
                attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
            });
            console.log(blogs);
            
            return blogs;
        }
    }

    store = async () => {
        const { title, content } = this.body;
        const { path: blog_image } = this.file;
        const { id: user_id } = this.credential;
        
        const blog = await db.blog.create({
            user_id, title, content, blog_image
        });

        return blog;
    }

    getOne = async () => {
        const { id } = this.params;

        if (this.credential.level === 'admin') {
            const blog = await db.blog.findOne({
                where: { id },
                attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
            });

            return blog;
        } else {
            const blog = await db.blog.findOne({
                where: {
                    id,
                    user_id: this.credential.id
                },
                attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
            });

            return blog;
        }
    }

    update = async () => {
        let data: object;
        const { id } = this.params;
        const { title, content } = this.body;

        if (this.file) {
            data = {
                title,
                content,
                blog_image: this.file.path
            }
        } else {
            data = {
                title,
                content
            }
        }

        if (this.credential.level === 'admin') {
            console.log('brooo');
            
            const blog = await db.blog.update({
                ...data
            }, {
                where: { id }
            });

            return blog;            
            
        } else {
            const blog = await db.blog.update({
                ...data
            }, {
                where: {
                    id,
                    user_id: this.credential.id
                }
            });

            return blog;
        }
    }

    delete = async () => {
        const { id } = this.params;

        if (this.credential.level === 'admin') {
            const blog = db.blog.destroy({
                where: { id }
            });

            return blog;
        } else {
            const blog = db.blog.destroy({
                where: {
                    id,
                    user_id: this.credential.id
                }
            });

            return blog;
        }
    }
}

export default BlogService;