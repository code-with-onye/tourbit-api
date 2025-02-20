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
exports.DeveloperService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/schema/user.schema");
const developer_schema_1 = require("./schema/developer.schema");
let DeveloperService = class DeveloperService {
    constructor(jwtService, userModel, developerModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.developerModel = developerModel;
    }
    async generateToken(email, userId) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const developer = await this.developerModel.findOne({ userId });
        const tokenVersion = developer?.tokenVersion
            ? developer.tokenVersion + 1
            : 1;
        const payload = { email: user.email, sub: user._id, tokenVersion };
        const token = this.jwtService.sign(payload);
        await this.developerModel.updateOne({ userId }, { $set: { token, userId, tokenVersion } }, { upsert: true });
        return { token };
    }
    async validateToken(token) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const developer = await this.developerModel.findOne({
            userId: payload.sub,
        });
        if (!developer || payload.tokenVersion !== developer.tokenVersion) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return developer;
    }
    async getMyToken(userId) {
        return await this.developerModel.findOne({ userId });
    }
};
exports.DeveloperService = DeveloperService;
exports.DeveloperService = DeveloperService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(developer_schema_1.Developer.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], DeveloperService);
//# sourceMappingURL=developer.service.js.map