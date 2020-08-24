"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = require("dotenv");
// Routers
var UserRoutes_1 = __importDefault(require("./routers/UserRoutes"));
var AuthRoutes_1 = __importDefault(require("./routers/AuthRoutes"));
var BlogRoutes_1 = __importDefault(require("./routers/BlogRoutes"));
// Client Routers
var ClientBlogRoutes_1 = __importDefault(require("./routers/client/ClientBlogRoutes"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.plugins();
        this.routes();
        dotenv_1.config();
    }
    App.prototype.plugins = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(morgan_1.default("dev"));
        this.app.use(compression_1.default());
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use('/uploads', express_1.default.static('uploads'));
    };
    App.prototype.routes = function () {
        this.app.route('/').get(function (req, res) {
            res.send("Blog API, by. JcDev21");
        });
        // Client
        this.app.use('/api', ClientBlogRoutes_1.default);
        // Server
        this.app.use('/api/v1/users', UserRoutes_1.default);
        this.app.use('/api/v1/auth', AuthRoutes_1.default);
        this.app.use('/api/v1/blog', BlogRoutes_1.default);
    };
    return App;
}());
var app = new App().app;
var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Aplikasi berjalan di port ' + port);
});
