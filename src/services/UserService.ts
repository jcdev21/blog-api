import { Request } from 'express';
import Authentication from '../utils/Authentication';
const db = require('../db/models');

class UserService {
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
        const users = await db.user.findAll({
            where: { is_active: 1 },
            attributes: ['id', 'username', 'name', 'email', 'level', 'is_active', 'photo']
        });

        return users;
    }

    store = async () => {
        const { username, password, email, name, level, is_active } = this.body;
        const { path: photo } = this.file;
        const hashedPassword: string = await Authentication.passwordHash(password);
        
        const user = await db.user.create({
            username, password: hashedPassword, email, name, level, is_active, photo 
        });

        return user;
    }

    getOne = async () => {
        const { id: user_id } = this.params;

        const user = await db.user.findOne({
            where: {
                id: user_id,
                is_active: 1
            },
            attributes: ['id', 'username', 'name', 'email', 'level', 'is_active', 'photo']
        });

        return user;
    }

    update = async () => {
        const { id: user_id } = this.params;
        const { name, level, is_active } = this.body;

        const user = await db.user.update(
            { name, level, is_active },
            { where: { id: user_id } }
        );

        return user;
    }

    delete = async () => {
        const { id: user_id } = this.params;

        const user = await db.user.destroy({
            where: { id: user_id }
        });

        return user;
    }

    changeFoto = async () => {
        const { id: user_id } = this.params;
        const { path: photo } = this.file;

        const user = await db.user.update(
            { photo },
            { where: { id: user_id } }
        );

        return user;
    }
}

export default UserService;