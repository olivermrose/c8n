import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.ts"],
		exclude: ["src/index.ts", "src/_internal.ts"],
		coverage: {
			enabled: true,
		},
	},
});
