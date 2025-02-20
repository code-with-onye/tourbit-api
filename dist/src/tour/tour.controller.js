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
exports.TourController = void 0;
const common_1 = require("@nestjs/common");
const tour_service_1 = require("./tour.service");
const tour_dto_1 = require("./dto/tour-dto");
const auth_guard_1 = require("../auth/guard/auth.guard");
const token_guard_1 = require("../token/guard/token.guard");
const tour_progress_service_1 = require("./tour-progress.service");
let TourController = class TourController {
    constructor(tourService, tourProgressService) {
        this.tourService = tourService;
        this.tourProgressService = tourProgressService;
    }
    async getTourProgress(user, tour) {
        return this.tourProgressService.getProgress(user, tour);
    }
    async updateTourProgress(user, tour, increment, totalStep) {
        return this.tourProgressService.updateProgress(user, tour, increment, totalStep);
    }
    async createTour(body, req) {
        return this.tourService.createTour({ ...body, userId: req.user.sub });
    }
    async getTours(req) {
        return this.tourService.getTours(req.user.sub);
    }
    async getTour(tourId) {
        return this.tourService.getTour(tourId);
    }
    async deleteTour(tourId) {
        return this.tourService.deleteTour(tourId);
    }
    async updateTour(tourId, body) {
        return this.tourService.updateTour(tourId, body);
    }
    async addStepToTour(tourId, step) {
        return this.tourService.addStepToTour(tourId, step);
    }
    async updateStep(tourId, stepId, updateStepDto) {
        return this.tourService.updateStepInTour(tourId, stepId, updateStepDto);
    }
    async deleteStep(tourId, stepId) {
        return this.tourService.deleteStepInTour(tourId, stepId);
    }
    async getPublicTour(authHeader, tourId) {
        const token = authHeader.split(' ')[1];
        const tour = this.tourService.getPublicTour(token, tourId);
        return tour;
    }
    async updatePublicTour(tourId, body) {
        return this.tourService.updatePublicTour(tourId, body);
    }
    async trackProgress(body) {
        return this.tourProgressService.trackProgress(body);
    }
};
exports.TourController = TourController;
__decorate([
    (0, common_1.Get)('progress'),
    __param(0, (0, common_1.Query)('user')),
    __param(1, (0, common_1.Query)('tour')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "getTourProgress", null);
__decorate([
    (0, common_1.Patch)('progress'),
    __param(0, (0, common_1.Query)('user')),
    __param(1, (0, common_1.Query)('tour')),
    __param(2, (0, common_1.Query)('increment')),
    __param(3, (0, common_1.Query)('totalStep')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "updateTourProgress", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tour_dto_1.TourDto, Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "createTour", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "getTours", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':tourId'),
    __param(0, (0, common_1.Param)('tourId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "getTour", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':tourId'),
    __param(0, (0, common_1.Param)('tourId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "deleteTour", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':tourId'),
    __param(0, (0, common_1.Param)('tourId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "updateTour", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('add-step/:tourId'),
    __param(0, (0, common_1.Param)('tourId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tour_dto_1.StepDto]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "addStepToTour", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':tourId/steps/:stepId'),
    __param(0, (0, common_1.Param)('tourId')),
    __param(1, (0, common_1.Param)('stepId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, tour_dto_1.StepDto]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "updateStep", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':tourId/steps/:stepId/delete'),
    __param(0, (0, common_1.Param)('tourId')),
    __param(1, (0, common_1.Param)('stepId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "deleteStep", null);
__decorate([
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    (0, common_1.Get)('/public-tour/:tourId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('tourId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "getPublicTour", null);
__decorate([
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    (0, common_1.Patch)('/public-update/:tourId'),
    __param(0, (0, common_1.Param)('tourId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "updatePublicTour", null);
__decorate([
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    (0, common_1.Post)('progress'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "trackProgress", null);
exports.TourController = TourController = __decorate([
    (0, common_1.Controller)('tour'),
    __metadata("design:paramtypes", [tour_service_1.TourService,
        tour_progress_service_1.TourProgressService])
], TourController);
//# sourceMappingURL=tour.controller.js.map