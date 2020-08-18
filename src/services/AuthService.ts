import { Request } from 'express';
import Authentication from '../utils/Authentication';
const db = require('../db/models');

class AuthService {
    credential: {
        iue: string,
        id: number,
        username: string,
        email: string,
        name: string,
        level: string,
        is_active: number
    }
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }

    loginVerification = async () => {
        const { username, password } = this.body;
        
        const user = await db.user.findOne({
            where: { username }
        });

        if (user == null) {
            return Promise.resolve({
                "errors": "authentication failed",
                "msg": "username not register"
            });
        }

        const compare = await Authentication.compare(password, user.password);
        
        if (compare) {
            const token = await Authentication.generateToken(user.id, username, user.email, user.name, user.level, user.is_active);
            const refreshToken = await Authentication.generateRefreshToken(`${user.id}_${username}_${user.email}`, user.id, username, user.email, user.name, user.level, user.is_active);

            await db.expired.create({ token: refreshToken });

            return Promise.resolve({ token, refreshToken });
        }

        return Promise.resolve({
                "errors": "authentication failed",
                "msg": "username or password is wrong"
        });
    }

    checkExistsToken = async (token: string) => {
        const checkToken = await db.expired.findOne({
            where: { token },
            attributes: ['token']
        });
        
        return checkToken;
    }

    getAccessToken = async () => {
        const { id, username, email, name, level, is_active } = this.credential;
        const token = await Authentication.generateToken(id, username, email, name, level, is_active);

        return Promise.resolve(token);
    }

    deleteToken = async (token: string) => {
        const result = await db.expired.destroy({
            where: { token }
        });

        return result;
    }
}

export default AuthService;