import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
	minify: false,
	target: "node18",
	outDir: "dist",
	outExtension({ format }) {
		return { js: format === "esm" ? ".mjs" : ".cjs" };
	},
});
