import { Serializer } from 'alpha-serializer';
import { Cursor } from "./Cursor";
import { Base64String } from "./types";
export declare class CursorEncoder {
    private serializer;
    constructor(serializer?: Serializer);
    decode(cursor: string): Cursor;
    private assertBase64;
    encode(cursor: Cursor): Base64String;
}
//# sourceMappingURL=CursorEncoder.d.ts.map