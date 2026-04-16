import { CursorEncoder } from "@pallad/cursor-encoder";

import { createGraphQLCursor } from "./createGraphQLCursor";

const encoder = new CursorEncoder();

export const GraphQLCursor = createGraphQLCursor(encoder);
