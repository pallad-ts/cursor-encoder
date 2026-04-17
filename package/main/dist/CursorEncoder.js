"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorEncoder = void 0;
const isCursor_1 = require("./isCursor");
const errors_1 = require("./errors");
class CursorEncoder {
    serializer;
    constructor(serializer = serializer) {
        this.serializer = serializer;
    }
    decode(cursor) {
        const buffer = this.assertBase64(cursor);
        const deserialized = this.serializer.deserialize(buffer.toString('utf8'));
        if (!(0, isCursor_1.isCursor)(deserialized)) {
            throw errors_1.ERRORS.INVALID_CURSOR_STRUCTURE.create();
        }
        // This is done on purpose to prevent forwarding extra properties
        return { k: deserialized.k, i: deserialized.i };
    }
    assertBase64(cursor) {
        const buffer = Buffer.from(cursor, 'base64url');
        if (buffer.toString('base64url') !== cursor) {
            throw errors_1.ERRORS.INVALID_ENCODING.create();
        }
        return buffer;
    }
    encode(cursor) {
        const serialized = this.serializer.serialize(cursor);
        return Buffer.from(serialized, 'utf8').toString('base64url');
    }
}
exports.CursorEncoder = CursorEncoder;
