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
exports.TourService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tour_schema_1 = require("./schema/tour.schema");
const mongoose_2 = require("mongoose");
const generate_tour_alias_1 = require("../../utils/generate-tour-alias");
const token_service_1 = require("../token/token.service");
let TourService = class TourService {
    constructor(tourModel, stepModel, tokenService) {
        this.tourModel = tourModel;
        this.stepModel = stepModel;
        this.tokenService = tokenService;
    }
    async createTour(data) {
        const alias = (0, generate_tour_alias_1.generateTourAlias)();
        const tour = new this.tourModel({ ...data, alias: alias });
        return tour.save();
    }
    async getTours(userId) {
        const tours = await this.tourModel.find({ userId }).exec();
        return tours;
    }
    async getTour(tourId) {
        const tour = await this.tourModel.findById(tourId);
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID ${tourId} not found`);
        }
        return tour;
    }
    async deleteTour(tourId) {
        const tour = await this.tourModel.findById(tourId);
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID ${tourId} not found`);
        }
        return this.tourModel.findByIdAndDelete(tourId);
    }
    async addStepToTour(tourId, stepDto) {
        const tour = await this.tourModel.findById(tourId);
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID ${tourId} not found`);
        }
        const step = new this.stepModel(stepDto);
        tour.steps.push(step);
        return tour.save();
    }
    async updateStepInTour(tourId, stepId, stepDto) {
        const tour = await this.tourModel.findById(tourId);
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID "${tourId}" not found`);
        }
        const step = tour.steps.find((step) => step._id.toString() === stepId);
        if (!step) {
            throw new common_1.NotFoundException(`Step with ID "${stepId}" not found`);
        }
        Object.assign(step, stepDto);
        await tour.save();
        return tour;
    }
    async deleteStepInTour(tourId, stepId) {
        const tour = await this.tourModel.findById(tourId);
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID "${tourId}" not found`);
        }
        const step = tour.steps.find((step) => step._id.toString() === stepId);
        if (!step) {
            throw new common_1.NotFoundException(`Step with ID "${stepId}" not found`);
        }
        tour.steps = tour.steps.filter((step) => step._id.toString() !== stepId);
        await tour.save();
        return tour;
    }
    async updateTour(tourId, data) {
        const tour = await this.tourModel.findById(tourId);
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID ${tourId} not found`);
        }
        return this.tourModel.findByIdAndUpdate(tourId, data, { new: true });
    }
    async getPublicTour(token, tourId) {
        const varifyToken = await this.tokenService.validateToken(token);
        const userId = varifyToken.userId;
        const tour = await this.tourModel.findOne({
            userId,
            alias: tourId,
        });
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID ${tourId} not found`);
        }
        return tour;
    }
    async updatePublicTour(tourId, data) {
        const tour = await this.tourModel.find({ alias: tourId });
        if (!tour) {
            throw new common_1.NotFoundException(`Tour with ID ${tourId} not found`);
        }
        return this.tourModel.updateOne({ alias: tourId }, data);
    }
};
exports.TourService = TourService;
exports.TourService = TourService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tour_schema_1.Tour.name)),
    __param(1, (0, mongoose_1.InjectModel)(tour_schema_1.Step.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        token_service_1.TokenService])
], TourService);
//# sourceMappingURL=tour.service.js.map