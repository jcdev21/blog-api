"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../db/models');
var BlogService = /** @class */ (function () {
    function BlogService(req) {
        var _this = this;
        this.getAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var blogs, blogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.credential.level === 'admin')) return [3 /*break*/, 2];
                        return [4 /*yield*/, db.blog.findAll({
                                attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
                            })];
                    case 1:
                        blogs = _a.sent();
                        return [2 /*return*/, blogs];
                    case 2: return [4 /*yield*/, db.blog.findAll({
                            where: { user_id: this.credential.id },
                            attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
                        })];
                    case 3:
                        blogs = _a.sent();
                        console.log(blogs);
                        return [2 /*return*/, blogs];
                }
            });
        }); };
        this.store = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, title, content, blog_image, user_id, blog;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.body, title = _a.title, content = _a.content;
                        blog_image = this.file.path;
                        user_id = this.credential.id;
                        return [4 /*yield*/, db.blog.create({
                                user_id: user_id, title: title, content: content, blog_image: blog_image
                            })];
                    case 1:
                        blog = _b.sent();
                        return [2 /*return*/, blog];
                }
            });
        }); };
        this.getOne = function () { return __awaiter(_this, void 0, void 0, function () {
            var id, blog, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.params.id;
                        if (!(this.credential.level === 'admin')) return [3 /*break*/, 2];
                        return [4 /*yield*/, db.blog.findOne({
                                where: { id: id },
                                attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
                            })];
                    case 1:
                        blog = _a.sent();
                        return [2 /*return*/, blog];
                    case 2: return [4 /*yield*/, db.blog.findOne({
                            where: {
                                id: id,
                                user_id: this.credential.id
                            },
                            attributes: ['id', 'user_id', 'title', 'content', 'blog_image', 'created_at', 'updated_at']
                        })];
                    case 3:
                        blog = _a.sent();
                        return [2 /*return*/, blog];
                }
            });
        }); };
        this.update = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, id, _a, title, content, blog, blog;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = this.params.id;
                        _a = this.body, title = _a.title, content = _a.content;
                        if (this.file) {
                            data = {
                                title: title,
                                content: content,
                                blog_image: this.file.path
                            };
                        }
                        else {
                            data = {
                                title: title,
                                content: content
                            };
                        }
                        if (!(this.credential.level === 'admin')) return [3 /*break*/, 2];
                        console.log('brooo');
                        return [4 /*yield*/, db.blog.update(__assign({}, data), {
                                where: { id: id }
                            })];
                    case 1:
                        blog = _b.sent();
                        return [2 /*return*/, blog];
                    case 2: return [4 /*yield*/, db.blog.update(__assign({}, data), {
                            where: {
                                id: id,
                                user_id: this.credential.id
                            }
                        })];
                    case 3:
                        blog = _b.sent();
                        return [2 /*return*/, blog];
                }
            });
        }); };
        this.delete = function () { return __awaiter(_this, void 0, void 0, function () {
            var id, blog, blog;
            return __generator(this, function (_a) {
                id = this.params.id;
                if (this.credential.level === 'admin') {
                    blog = db.blog.destroy({
                        where: { id: id }
                    });
                    return [2 /*return*/, blog];
                }
                else {
                    blog = db.blog.destroy({
                        where: {
                            id: id,
                            user_id: this.credential.id
                        }
                    });
                    return [2 /*return*/, blog];
                }
                return [2 /*return*/];
            });
        }); };
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.file = req.file;
    }
    return BlogService;
}());
exports.default = BlogService;
