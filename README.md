# is-json

[![CI](https://github.com/joaquimserafim/is-json/actions/workflows/ci.yml/badge.svg)](https://github.com/joaquimserafim/is-json/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/is-json.svg)](https://www.npmjs.com/package/is-json)

Check whether a value is a valid JSON object/array (as a string, or a plain
object) — without writing a `try/catch` on the caller side.

## Install

```sh
npm install is-json
# or
pnpm add is-json
# or
yarn add is-json
```

## Size

Zero runtime dependencies. What ships in the npm tarball:

| What                                  | Raw      | Gzipped  |
| ------------------------------------- | -------- | -------- |
| **ESM runtime** (`index.mjs`)         | 996 B    | 407 B    |
| **CJS runtime** (`index.cjs`)         | 1 006 B  | 418 B    |
| **Types** (`.d.mts` / `.d.cts`)       | 2 398 B  | 678 B    |
| Sourcemaps (debug-only, not loaded)   | 6 598 B  | 1 360 B  |

Only one of the two runtime files is loaded by your bundler / Node, so the
real cost in your app is a single sub-KB module.

## Usage

```js
import isJSON from "is-json";              // ESM
// const isJSON = require("is-json");      // CJS — same function

isJSON('{"a":1,"b":[1,2,3]}');             // true
isJSON('[{"a":1}, {"b":2}]');              // true
isJSON('{"a":"contains } brace"}');        // true (v2 used to fail here)

isJSON('not json');                        // false
isJSON('{a:1}');                           // false (invalid JSON)
isJSON("");                                // false
isJSON(null);                              // false
isJSON(42);                                // false (default rejects non-strings)
```

### `passObjects` — accept plain objects directly

```js
isJSON({ a: 12, b: [1, 2, 3] });           // false (string required)
isJSON({ a: 12, b: [1, 2, 3] }, true);     // true  (plain object accepted)

isJSON([1, 2, 3], true);                   // false (arrays are not plain objects)
isJSON(new Date(), true);                  // false (Date is not a plain object)
isJSON(new Map(), true);                   // false
```

Only objects whose prototype is `Object.prototype` (or `null`) qualify.
Arrays, class instances, `Date`, `Map`, etc. are rejected.

### `isJSON.strict` — accept any valid JSON token

The default `isJSON` only accepts object/array shapes (a deliberate v3
choice — most callers want "is this a JSON payload"). For full RFC 8259
validity (scalars at the top level), use `strict`:

```js
isJSON("42");           // false  — scalar tokens rejected by default
isJSON.strict("42");    // true   — any valid JSON value
isJSON.strict("true");  // true
isJSON.strict("null");  // true
isJSON.strict('"hi"');  // true

isJSON.strict({ a: 1 }); // true  — plain objects also accepted
isJSON.strict(123);      // false — non-string, non-plain-object inputs rejected
```

## API

```ts
interface IsJSON {
  (value: unknown, passObjects?: boolean): boolean;
  strict: (value: unknown) => boolean;
}

declare const isJSON: IsJSON;
export default isJSON;
```

## Migrating from v2

`isJSON(str, passObjects?)` and `isJSON.strict(str)` keep the same shape
and the same `require('is-json')` / default-import ergonomics. Behaviour
changes that may affect you:

| Scenario | v2 | v3 |
| --- | --- | --- |
| `isJSON('[1,2,3]')` | `false` (regex bug) | `true` |
| `isJSON('{"a":"}"}')` | `false` (regex bug) | `true` |
| `isJSON('{"msg":"hello world"}')` | brittle | `true` |
| `isJSON.strict({a:1})` | `true` | `true` (preserved) |
| `isJSON.strict('null')` | `null` (falsy) | `true` |
| `isJSON.strict(123)` | `true` (parse coercion) | `false` |
| `isJSON({...}, true)` accepting class instances | `true` | `false` |

The regex-based default validator from v2 has been replaced with a
`JSON.parse`-based check, eliminating false positives and false negatives
around braces in strings, whitespace-in-values, and nested arrays.

## License

ISC © [@joaquimserafim](https://github.com/joaquimserafim)
