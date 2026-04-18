import { Cursor } from "./Cursor";

export function isCursor<T = unknown>(value: unknown): value is Cursor<T> {
	return (
		typeof value === "object" &&
		value !== null &&
		"i" in value &&
		typeof (value as any).i === "string"
	);
}
