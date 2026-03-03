import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
	test: {
		includeSource: ["src/**/*.ts"],
		exclude: ["src/index.ts", "src/_internal.ts", ...configDefaults.exclude],
		coverage: {
			enabled: true,
			include: ["src/**/*.ts"],
			exclude: ["src/index.ts", "src/_internal.ts"],
		},
	},
});
