"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
const token_guard_1 = require("./guard/token.guard");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async generateToken(req) {
        const user = req.user;
        const token = await this.tokenService.generateAndStoreToken(user.sub, user.email);
        return { token };
    }
    async getToken(req) {
        const user = req.user;
        const token = await this.tokenService.getToken(user.sub);
        return { token };
    }
    async validateToken(authHeader) {
        if (!authHeader) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        const userData = await this.tokenService.validateToken(token);
        if (!userData) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return userData;
    }
};
exports.TokenController = TokenController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "generateToken", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "getToken", null);
__decorate([
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    (0, common_1.Get)('validate-token'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "validateToken", null);
exports.TokenController = TokenController = __decorate([
    (0, common_1.Controller)('token'),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
//# sourceMappingURL=token.controller.js.map