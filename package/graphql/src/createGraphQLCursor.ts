import {CursorEncoder} from '@pallad/cursor-encoder';

export function createGraphQLCursor(encoder: CursorEncoder) {

	function stringToCursor(value: string) {
		try {
			return encoder.decode(value);
		} catch (error) {
			throw new GraphQLError(`Invalid cursor format`);
		}
	}


	return new GraphQLScalarType({
		name: "Cursor",
		description: "Cursor for pagination",

		serialize(value: unknown) {
			const parsed = CursorSchema.safeParse(value);
			if (!parsed.success) {
				throw new GraphQLError("Invalid cursor object");
			}
			return encoder.encode(parsed.data);
		},

		parseValue(value) {
			return stringToCursor(value as string);
		},

		parseLiteral(ast) {
			if (ast.kind === "StringValue") {
				return stringToCursor(ast.value);
			}
			throw new GraphQLError("Cursor must be a string");
		},
	});
}
