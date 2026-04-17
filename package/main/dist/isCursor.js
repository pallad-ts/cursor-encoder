"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCursor = isCursor;
function isCursor(value) {
    // eslint-disable-next-line no-null/no-null
    return typeof value === 'object' && value !== null && 'i' in value && typeof value.i === 'string';
}
