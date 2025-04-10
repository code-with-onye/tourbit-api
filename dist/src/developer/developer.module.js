"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../auth/schema/user.schema");
const shared_module_1 = require("../shared.module");
const developer_schema_1 = require("./schema/developer.schema");
const developer_service_1 = require("./developer.service");
const developer_controller_1 = require("./developer.controller");
let DeveloperModule = class DeveloperModule {
};
exports.DeveloperModule = DeveloperModule;
exports.DeveloperModule = DeveloperModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: developer_schema_1.Developer.name, schema: developer_schema_1.DeveloperSchema },
            ]),
        ],
        providers: [developer_service_1.DeveloperService],
        controllers: [developer_controller_1.DeveloperController],
    })
], DeveloperModule);
//# sourceMappingURL=developer.module.js.map