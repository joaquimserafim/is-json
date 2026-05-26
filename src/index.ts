/**
 * is-json — check whether a value is a valid JSON object/array (string or
 * plain-object form), without exposing a try/catch to the caller.
 *
 * v3 highlights:
 *   - Default `isJSON` accepts only object/array-shaped JSON strings
 *     (i.e. starting with `{` or `[`). Scalar JSON tokens like "42" or
 *     "true" are rejected by the default path on purpose — use `strict`
 *     for full RFC 8259 acceptance.
 *   - `passObjects` only accepts *plain* objects (prototype is
 *     `Object.prototype` or `null`); arrays, Dates, Maps, and class
 *     instances are rejected.
 *   - `strict` mirrors `JSON.parse` validity but additionally accepts
 *     plain objects (back-compat with v2) and rejects non-string inputs
 *     up front so we never rely on `JSON.parse`'s implicit coercion.
 *
 * The package is shipped as a single default export so that both
 * `import isJSON from "is-json"` and `const isJSON = require("is-json")`
 * give you the function directly (matching v2's CJS shape).
 */

function isPlainObject(value: unknown): boolean {
	if (value === null || typeof value !== "object") return false;
	const proto = Object.getPrototypeOf(value);
	return proto === null || proto === Object.prototype;
}

function tryParseJSON(value: string): boolean {
	try {
		JSON.parse(value);
		return true;
	} catch {
		return false;
	}
}

function isJSONImpl(value: unknown, passObjects?: boolean): boolean {
	if (passObjects && isPlainObject(value)) return true;
	if (typeof value !== "string") return false;

	const trimmed = value.trim();
	if (trimmed.length === 0) return false;

	const first = trimmed[0];
	if (first !== "{" && first !== "[") return false;

	return tryParseJSON(trimmed);
}

function strict(value: unknown): boolean {
	if (isPlainObject(value)) return true;
	if (typeof value !== "string") return false;
	return tryParseJSON(value);
}

export interface IsJSON {
	(value: unknown, passObjects?: boolean): boolean;
	strict: (value: unknown) => boolean;
}

const isJSON: IsJSON = Object.assign(isJSONImpl, { strict });

export default isJSON;
