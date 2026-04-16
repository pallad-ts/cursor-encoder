import {Domain, ErrorDescriptor, formatCodeFactory} from "@pallad/errors";

const code = formatCodeFactory('E_CURSOR_%c')
export const ERRORS = new Domain()
	.addErrorsDescriptorsMap({
		INVALID_ENCODING: ErrorDescriptor.useDefaultMessage(code(1), 'Invalid cursor encoding'),
		INVALID_CURSOR_STRUCTURE: ErrorDescriptor.useDefaultMessage(code(2), 'Invalid cursor structure'),
	})
