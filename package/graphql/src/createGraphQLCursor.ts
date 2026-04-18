import { CursorEncoder, Cursor, isCursor } from "@pallad/cursor-encoder";
import { GraphQLError } from "graphql/error";
import { GraphQLScalarType } from "graphql";
import * as is from "predicates";

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
			if (isCursor(value)) {
				return encoder.encode(value as Cursor);
			}
			throw new GraphQLError("Invalid cursor object");
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
