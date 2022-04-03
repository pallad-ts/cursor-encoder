import {Domain} from "alpha-errors";
import {formatCode} from "alpha-errors/compiled/codeGenerators";
import {CursorError} from "./CursorError";

export const ERRORS = Domain.create({
	codeGenerator: formatCode('E_CURSOR_%d'),
	errorClass: CursorError
}).createErrors(create => {
	return {
		INVALID_ENCODING: create('Invalid cursor encoding'),
		INVALID_CURSOR_STRUCTURE: create('Invalid cursor structure'),
		CANNOT_DESERIALIZE: create('Cannot deserialize cursor: %s'),
		CANNOT_SERIALIZE: create('Cannot serialize cursor: %s')
	}
})
