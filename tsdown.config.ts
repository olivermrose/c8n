import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	minify: true,
	target: ["es2020"],
	define: {
		"import.meta.vitest": "undefined",
	},
});
