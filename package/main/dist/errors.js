"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = void 0;
const errors_1 = require("@pallad/errors");
const code = (0, errors_1.formatCodeFactory)('E_CURSOR_%c');
exports.ERRORS = new errors_1.Domain()
    .addErrorsDescriptorsMap({
    INVALID_ENCODING: errors_1.ErrorDescriptor.useDefaultMessage(code(1), 'Invalid cursor encoding'),
    INVALID_CURSOR_STRUCTURE: errors_1.ErrorDescriptor.useDefaultMessage(code(2), 'Invalid cursor structure'),
});
