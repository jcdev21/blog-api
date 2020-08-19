import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';

// Routers
import UserRoutes from './routers/UserRoutes';
import AuthRoutes from './routers/AuthRoutes';
import BlogRoutes from './routers/BlogRoutes';

// Client Routers
import ClientBlogRoutes from './routers/client/ClientBlogRoutes';
import TestingRoutes from './routers/client/TestingRoutes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use('/uploads', express.static('uploads'));
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send("Blog API, by. Muhammad Jundurrahmans ok");
        });

        // Client
        this.app.use('/api', cors(), ClientBlogRoutes);
        this.app.use('/testing', cors(), TestingRoutes);

        // Server
        this.app.use('/api/v1/users', UserRoutes);
        this.app.use('/api/v1/auth', AuthRoutes);
        this.app.use('/api/v1/blog', BlogRoutes);
    }
}

const app = new App().app;
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Aplikasi berjalan di port '+ port);
});