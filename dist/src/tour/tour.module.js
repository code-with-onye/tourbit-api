"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shared_module_1 = require("../shared.module");
const tour_schema_1 = require("./schema/tour.schema");
const tour_service_1 = require("./tour.service");
const tour_controller_1 = require("./tour.controller");
const user_schema_1 = require("../auth/schema/user.schema");
const token_schema_1 = require("../token/schemas/token.schema");
const token_service_1 = require("../token/token.service");
const tour_progress_service_1 = require("./tour-progress.service");
const tour_progress_schema_1 = require("./schema/tour-progress.schema");
let TourModule = class TourModule {
};
exports.TourModule = TourModule;
exports.TourModule = TourModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forFeature([{ name: tour_schema_1.Tour.name, schema: tour_schema_1.TourSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: tour_schema_1.Step.name, schema: tour_schema_1.StepSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: tour_progress_schema_1.TourProgress.name, schema: tour_progress_schema_1.TourProgressSchema },
            ]),
        ],
        providers: [tour_service_1.TourService, token_service_1.TokenService, tour_progress_service_1.TourProgressService],
        controllers: [tour_controller_1.TourController],
    })
], TourModule);
//# sourceMappingURL=tour.module.js.map