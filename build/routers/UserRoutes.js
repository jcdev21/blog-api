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
var UserValidator_1 = require("../middlewares/UserValidator");
var multer_1 = __importDefault(require("multer"));
var MulterMiddleware_1 = __importDefault(require("../middlewares/MulterMiddleware"));
var UserController_1 = __importDefault(require("../controllers/UserController"));
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
var UserRoutes = /** @class */ (function (_super) {
    __extends(UserRoutes, _super);
    function UserRoutes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRoutes.prototype.routes = function () {
        this.router.get('/', AuthMiddleware_1.auth, AuthMiddleware_1.adminAccess, UserController_1.default.index);
        this.router.post('/', upload.single('photo'), UserValidator_1.validate, UserController_1.default.create);
        this.router.get('/:id', AuthMiddleware_1.auth, AuthMiddleware_1.adminAccess, UserController_1.default.show);
        this.router.put('/:id', AuthMiddleware_1.auth, AuthMiddleware_1.adminAccess, UserValidator_1.updateValidate, UserController_1.default.update);
        this.router.delete('/:id', AuthMiddleware_1.auth, AuthMiddleware_1.adminAccess, UserController_1.default.delete);
        this.router.put('/:id/change-foto', AuthMiddleware_1.auth, upload.single('photo'), UserController_1.default.changeFoto);
        // upload cara 1
        this.router.post('/upload', AuthMiddleware_1.auth, AuthMiddleware_1.adminAccess, upload.single('photo'), UserValidator_1.validate, UserController_1.default.upload);
        // multifile
        this.router.post('/upload-multifile', AuthMiddleware_1.auth, AuthMiddleware_1.adminAccess, upload.array('files', 3), UserController_1.default.uploadMultiFile);
        // upload cara 2
        // this.router.post('/upload', validate, UserController.uploadDua);
        // this.router.post('/upload_foto', upload.single('photo'), UserController.uploadFoto);
        /**
         * Mengatasi masalah upload : (belum efektif)
         *  1. dengan 1 endpoit, cuma file akan terupload lebih dahulu, sebelum data divalidasi
         *  - memakai cara 1, cuma file di simpan sementara dulu, nanti tergantung validasi,
         *     kalau gagal hapus file
         *  2. membuat 2 endpoit, pertama untuk data string lalu di then frontend, akses endpoit upload file,
         *     berarti di endpoit pertama harus mengembalikan data baru melalui response
         */
    };
    return UserRoutes;
}(BaseRouter_1.default));
exports.default = new UserRoutes().router;
