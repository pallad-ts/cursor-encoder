"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alpha_serializer_1 = require("alpha-serializer");
const CursorEncoder_1 = require("../CursorEncoder");
const id_1 = require("@pallad/id");
const sinon = require("sinon");
const errors_1 = require("../errors");
require("@pallad/errors-dev");
describe("CursorEncoder", () => {
    let cursorEncoder;
    let serializer;
    const CURSOR = {
        i: (0, id_1.create)(),
        k: "sortableValue",
    };
    beforeEach(() => {
        serializer = new alpha_serializer_1.Serializer(new alpha_serializer_1.JSONAdapter(), alpha_serializer_1.normalizer);
        cursorEncoder = new CursorEncoder_1.CursorEncoder(serializer);
    });
    describe("decode", () => {
        describe("fails", () => {
            it("due encoding", () => {
                expect(() => {
                    cursorEncoder.decode("completely-invalid-base64_for_SURE!:)");
                }).toThrowErrorWithCode(errors_1.ERRORS.INVALID_ENCODING);
            });
            it.each([[{ foo: "bar" }], [{ i: ["test"] }]])("due to invalid structure of serializable string: %s", input => {
                expect(() => {
                    cursorEncoder.decode(Buffer.from(serializer.serialize(input), "utf8").toString("base64"));
                }).toThrowErrorWithCode(errors_1.ERRORS.INVALID_CURSOR_STRUCTURE);
            });
        });
        it("success", () => {
            const result = cursorEncoder.decode(cursorEncoder.encode(CURSOR));
            expect(result).toStrictEqual(CURSOR);
        });
    });
    describe("encode", () => {
        it.each([[{ k: new Date(), i: (0, id_1.create)() }], [{ k: 10, i: (0, id_1.create)() }]])("success: %s", cursor => {
            const encoded = cursorEncoder.encode(cursor);
            const decoded = cursorEncoder.decode(encoded);
            expect(decoded).toStrictEqual(cursor);
        });
        it("uses provided serializer instead default one", () => {
            const serializer = sinon.createStubInstance(alpha_serializer_1.Serializer);
            const encoder = new CursorEncoder_1.CursorEncoder(serializer);
            const dummyResult = "somestring";
            serializer.serialize.returns(dummyResult);
            const cursor = { i: "test" };
            const result = encoder.encode(cursor);
            expect(result).toEqual(Buffer.from(dummyResult, "utf8").toString("base64"));
        });
    });
});
