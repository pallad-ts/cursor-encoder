import {Serializer} from 'alpha-serializer';
import {Cursor} from "./Cursor";
import {isCursor} from "./isCursor";
import {Base64String} from "./types";
import {ERRORS} from "./errors";

export class CursorEncoder {
	constructor(private serializer: Serializer = serializer) {
	}

	decode(cursor: string): Cursor {
		const buffer = this.assertBase64(cursor);
		const deserialized = this.serializer.deserialize(buffer.toString('utf8'));

		if (!isCursor(deserialized)) {
			throw ERRORS.INVALID_CURSOR_STRUCTURE.create();
		}

		// This is done on purpose to prevent forwarding extra properties
		return {k: deserialized.k, i: deserialized.i};
	}

	private assertBase64(cursor: Base64String) {
		const buffer = Buffer.from(cursor, 'base64')
		if (buffer.toString('base64') !== cursor) {
			throw ERRORS.INVALID_ENCODING.create();
		}
		return buffer;
	}

	encode(cursor: Cursor): Base64String {
		const serialized = this.serializer.serialize(cursor);
		return Buffer.from(serialized, 'utf8').toString('base64');
	}
}
