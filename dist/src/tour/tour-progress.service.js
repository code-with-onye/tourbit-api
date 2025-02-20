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
exports.TourProgressService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const tour_progress_schema_1 = require("./schema/tour-progress.schema");
const mongoose_2 = require("mongoose");
let TourProgressService = class TourProgressService {
    constructor(tourProgressModel) {
        this.tourProgressModel = tourProgressModel;
    }
    async trackProgress(createTourProgress) {
        const { user, tour } = createTourProgress;
        const existingProgress = await this.tourProgressModel
            .findOne({ user, tour })
            .exec();
        if (existingProgress) {
            return existingProgress;
        }
        return await this.tourProgressModel.create(createTourProgress);
    }
    async getProgress(userId, alias) {
        return this.tourProgressModel
            .aggregate([
            { $match: { user: userId, tour: alias } },
            {
                $lookup: {
                    from: 'signedinusers',
                    localField: 'user',
                    foreignField: 'userId',
                    as: 'userDetails',
                },
            },
            { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'tours',
                    localField: 'tour',
                    foreignField: 'alias',
                    as: 'tourDetails',
                },
            },
            { $unwind: { path: '$tourDetails', preserveNullAndEmptyArrays: true } },
            { $limit: 1 },
        ])
            .exec()
            .then((results) => results[0] || null);
    }
    async updateProgress(user, tour, incrementValue, totalSteps) {
        try {
            const progress = await this.tourProgressModel
                .findOne({ user, tour })
                .exec();
            if (!progress) {
                throw new Error('Progress for the specified user and tour not found.');
            }
            progress.completedSteps = incrementValue;
            if (progress.completedSteps >= totalSteps) {
                progress.completedSteps = totalSteps;
                progress.isCompleted = true;
            }
            else {
                progress.isCompleted = false;
            }
            return await progress.save();
        }
        catch (error) {
            throw new Error(`Failed to update progress: ${error.message}`);
        }
    }
};
exports.TourProgressService = TourProgressService;
exports.TourProgressService = TourProgressService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(tour_progress_schema_1.TourProgress.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TourProgressService);
//# sourceMappingURL=tour-progress.service.js.map