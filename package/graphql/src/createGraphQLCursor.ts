import { CursorEncoder, Cursor } from "@pallad/cursor-encoder";
import { GraphQLError } from "graphql/error";
import { GraphQLScalarType } from "graphql";
import * as is from "predicates";

const isCursor = is.all(is.property("i", is.string));

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
