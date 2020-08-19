"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BlogService_1 = __importDefault(require("../services/BlogService"));
var fs = require('fs');
var BlogController = /** @class */ (function () {
    function BlogController() {
        var _this = this;
        this.index = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var service, blogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new BlogService_1.default(req);
                        return [4 /*yield*/, service.getAll()];
                    case 1:
                        blogs = _a.sent();
                        return [2 /*return*/, res.send({
                                data: blogs,
                                msg: ''
                            })];
                }
            });
        }); };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var service, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new BlogService_1.default(req);
                        return [4 /*yield*/, service.store()];
                    case 1:
                        blog = _a.sent();
                        return [2 /*return*/, res.send({
                                data: blog,
                                msg: 'blog created'
                            })];
                }
            });
        }); };
        this.show = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var service, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new BlogService_1.default(req);
                        return [4 /*yield*/, service.getOne()];
                    case 1:
                        blog = _a.sent();
                        return [2 /*return*/, res.send({
                                data: blog,
                                msg: ''
                            })];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var service, oldImage, oldData, blog, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new BlogService_1.default(req);
                        if (!req.file) return [3 /*break*/, 2];
                        return [4 /*yield*/, service.getOne()];
                    case 1:
                        oldData = _a.sent();
                        oldImage = oldData.blog_image;
                        return [3 /*break*/, 3];
                    case 2:
                        oldImage = '';
                        _a.label = 3;
                    case 3: return [4 /*yield*/, service.update()];
                    case 4:
                        blog = _a.sent();
                        if (!blog) return [3 /*break*/, 6];
                        fs.unlink(oldImage, function () { });
                        return [4 /*yield*/, service.getOne()];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, res.send({
                                data: data,
                                msg: ''
                            })];
                    case 6: return [2 /*return*/, res.send({
                            data: blog,
                            msg: 'error'
                        })];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var service, oldData, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new BlogService_1.default(req);
                        return [4 /*yield*/, service.getOne()];
                    case 1:
                        oldData = _a.sent();
                        return [4 /*yield*/, service.delete()];
                    case 2:
                        blog = _a.sent();
                        if (blog)
                            fs.unlink(oldData.blog_image, function () { });
                        return [2 /*return*/, res.send({
                                data: blog,
                                msg: ''
                            })];
                }
            });
        }); };
    }
    return BlogController;
}());
exports.default = new BlogController;