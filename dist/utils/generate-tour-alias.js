"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTourAlias = generateTourAlias;
const crypto = require("crypto");
function generateTourAlias() {
    const prefix = 'tourbit-';
    const randomString = crypto.randomBytes(3).toString('hex');
    return `${prefix}${randomString}`;
}
//# sourceMappingURL=generate-tour-alias.js.map