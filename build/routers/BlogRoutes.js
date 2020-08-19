"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseRouter_1 = __importDefault(require("./BaseRouter"));
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var BlogValidator_1 = require("../middlewares/BlogValidator");
var multer_1 = __importDefault(require("multer"));
var MulterMiddleware_1 = __importDefault(require("../middlewares/MulterMiddleware"));
var BlogController_1 = __importDefault(require("../controllers/BlogController"));
var mimetypeImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
var upload = multer_1.default({
    storage: MulterMiddleware_1.default,
    limits: { fileSize: 1024 * 1024 * 0.4 },
    fileFilter: function (req, file, cb) {
        if (mimetypeImage.indexOf(file.mimetype) !== -1) {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
var BlogRoutes = /** @class */ (function (_super) {
    __extends(BlogRoutes, _super);
    function BlogRoutes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlogRoutes.prototype.routes = function () {
        this.router.get('/', AuthMiddleware_1.auth, AuthMiddleware_1.userActive, BlogController_1.default.index);
        this.router.post('/', AuthMiddleware_1.auth, AuthMiddleware_1.userActive, upload.single('blog_image'), BlogValidator_1.validate, BlogController_1.default.create);
        this.router.get('/:id', AuthMiddleware_1.auth, AuthMiddleware_1.userActive, BlogController_1.default.show);
        this.router.put('/:id', AuthMiddleware_1.auth, AuthMiddleware_1.userActive, upload.single('blog_image'), BlogValidator_1.validate, BlogController_1.default.update);
        this.router.delete('/:id', AuthMiddleware_1.auth, AuthMiddleware_1.userActive, BlogController_1.default.delete);
    };
    return BlogRoutes;
}(BaseRouter_1.default));
exports.default = new BlogRoutes().router;
