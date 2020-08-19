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
var BaseRouter_1 = __importDefault(require("../BaseRouter"));
var TestingController_1 = __importDefault(require("../../controllers/client/TestingController"));
var ClientBlogRoutes = /** @class */ (function (_super) {
    __extends(ClientBlogRoutes, _super);
    function ClientBlogRoutes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientBlogRoutes.prototype.routes = function () {
        this.router.get('/', TestingController_1.default.index);
    };
    return ClientBlogRoutes;
}(BaseRouter_1.default));
exports.default = new ClientBlogRoutes().router;
