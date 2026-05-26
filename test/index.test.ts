import { describe, expect, it } from "vitest";
import isJSON, { type IsJSON } from "../src/index.js";

const strict = isJSON.strict;

describe("isJSON (default path)", () => {
	describe("rejects obviously non-JSON inputs", () => {
		it.each([
			["garbage with brackets", "asdada[]asdadada sd asdasda das das"],
			["null", null],
			["false", false],
			["empty string", ""],
			["a plain string", "normal string"],
			["integer number", 2014],
			["float number", 2014.5],
			["undefined", undefined],
			["a plain object without passObjects", { a: 12, b: [1, 2, 3] }],
			["an array without passObjects", [1, 2, 3, 4]],
			["a Date instance", new Date()],
			["a comma-separated string", "1,2,3"],
			["a malformed brace block", "{1,2,3}"],
			["a malformed array", '[{"a": 123}, {1,2,3}}]'],
		])("returns false for %s", (_label, input) => {
			expect(isJSON(input)).toBe(false);
		});
	});

	describe("accepts well-formed JSON object/array strings", () => {
		it("accepts a flat object string", () => {
			expect(
				isJSON('{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}')
			).toBe(true);
		});

		it("accepts a deeply nested array of objects", () => {
			const cobj = `[{"a": {"aa": [1,2,3,4], "aaa": {"d": 1212}}}, {"b": "test", "c": [1,2,3], "date": "${new Date().toISOString()}"}]`;
			expect(isJSON(cobj)).toBe(true);
		});

		it("accepts a simple numeric array (v2 returned false here — fixed)", () => {
			expect(isJSON("[1,2,3]")).toBe(true);
		});

		it("accepts braces appearing inside string values (v2 regex was wrong)", () => {
			expect(isJSON('{"a":"}"}')).toBe(true);
			expect(isJSON('{"a":"{nested}"}')).toBe(true);
		});

		it("accepts strings whose values contain whitespace (v2 stripped it)", () => {
			expect(isJSON('{"msg":"hello world"}')).toBe(true);
			expect(isJSON('{"msg":"line1\\nline2"}')).toBe(true);
		});

		it("accepts surrounding whitespace via trim", () => {
			expect(isJSON('   {"a":1}   ')).toBe(true);
			expect(isJSON('\n\t{"a":1}\n')).toBe(true);
		});
	});

	describe("rejects JSON-scalar tokens at the top level (deliberate v3 choice)", () => {
		it.each(['"hello"', "42", "true", "false", "null"])(
			"rejects scalar token %s",
			(input) => {
				expect(isJSON(input)).toBe(false);
			}
		);
	});

	describe("passObjects flag", () => {
		it("accepts a plain object when enabled", () => {
			expect(isJSON({ a: 12, b: [1, 2, 3] }, true)).toBe(true);
		});

		it("rejects arrays even with passObjects=true (plain-object brand only)", () => {
			expect(isJSON([1, 2, 3], true)).toBe(false);
		});

		it("rejects Date / Map / class instances with passObjects=true", () => {
			expect(isJSON(new Date(), true)).toBe(false);
			expect(isJSON(new Map(), true)).toBe(false);

			class Foo {
				readonly x = 1;
			}
			expect(isJSON(new Foo(), true)).toBe(false);
		});

		it("rejects null even with passObjects=true", () => {
			expect(isJSON(null, true)).toBe(false);
		});

		it("accepts Object.create(null) as a plain object", () => {
			expect(isJSON(Object.create(null), true)).toBe(true);
		});
	});
});

describe("isJSON.strict", () => {
	it("accepts JSON object strings with embedded newlines", () => {
		expect(strict('{\n "config": 123,\n "test": "abcde" \n}')).toBe(true);
	});

	it("accepts plain objects directly (back-compat with v2)", () => {
		expect(strict({ a: 1 })).toBe(true);
	});

	it("accepts scalar JSON tokens (where default isJSON rejects them)", () => {
		expect(strict("42")).toBe(true);
		expect(strict("true")).toBe(true);
		expect(strict("false")).toBe(true);
		expect(strict("null")).toBe(true);
		expect(strict('"hello"')).toBe(true);
	});

	it("rejects invalid JSON", () => {
		expect(strict("{a:1}")).toBe(false);
		expect(strict("undefined")).toBe(false);
		expect(strict("")).toBe(false);
	});

	it("rejects non-string, non-plain-object input (no JSON.parse coercion)", () => {
		expect(strict(123)).toBe(false);
		expect(strict(true)).toBe(false);
		expect(strict(null)).toBe(false);
		expect(strict(undefined)).toBe(false);
		expect(strict([1, 2, 3])).toBe(false);
		expect(strict(new Date())).toBe(false);
	});
});

describe("module surface", () => {
	it("exposes strict as a property of the default export", () => {
		expect(isJSON.strict).toBe(strict);
		expect(typeof isJSON.strict).toBe("function");
	});

	it("conforms to the IsJSON interface shape", () => {
		const fn: IsJSON = isJSON;
		expect(typeof fn).toBe("function");
		expect(typeof fn.strict).toBe("function");
	});
});
