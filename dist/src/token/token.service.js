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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const token_schema_1 = require("./schemas/token.schema");
const crypto = require("crypto");
let TokenService = class TokenService {
    constructor(tokenModel) {
        this.tokenModel = tokenModel;
    }
    async generateAndStoreToken(userId, email) {
        const token = `tourbit_${crypto.randomBytes(16).toString('hex')}`;
        await this.tokenModel.updateOne({ userId }, { $set: { token, userId, email } }, { upsert: true });
        return token;
    }
    async getToken(userId) {
        const tokenDoc = await this.tokenModel.findOne({ userId }).exec();
        return tokenDoc ? tokenDoc.token : null;
    }
    async validateToken(token) {
        const tokenDoc = await this.tokenModel.findOne({ token }).exec();
        if (!tokenDoc)
            return null;
        return { userId: tokenDoc.userId, email: tokenDoc.email };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TokenService);
//# sourceMappingURL=token.service.js.map