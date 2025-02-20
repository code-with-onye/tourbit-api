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
exports.DeveloperController = void 0;
const common_1 = require("@nestjs/common");
const developer_service_1 = require("./developer.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
let DeveloperController = class DeveloperController {
    constructor(developerService) {
        this.developerService = developerService;
    }
    async generateToken(req) {
        const user = req.user;
        const token = await this.developerService.generateToken(user.email, user.sub);
        return { token };
    }
    async getMyToken(req) {
        const user = req.user;
        return await this.developerService.getMyToken(user.sub);
    }
    async validateMyToken(authHeader) {
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.developerService.validateToken(token);
    }
};
exports.DeveloperController = DeveloperController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeveloperController.prototype, "generateToken", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/my-token'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeveloperController.prototype, "getMyToken", null);
__decorate([
    (0, common_1.Get)('/validate-token'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeveloperController.prototype, "validateMyToken", null);
exports.DeveloperController = DeveloperController = __decorate([
    (0, common_1.Controller)('developer'),
    __metadata("design:paramtypes", [developer_service_1.DeveloperService])
], DeveloperController);
//# sourceMappingURL=developer.controller.js.map