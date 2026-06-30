import { defineConfig, configDefaults } from "vite-plus";

export default defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	pack: {
		entry: ["src/index.ts", "src/bigint/index.ts"],
		minify: true,
		target: ["es2020"],
		define: {
			"import.meta.vitest": "undefined",
		},
	},
	test: {
		includeSource: ["src/**/*.ts"],
		exclude: ["src/index.ts", "src/_internal.ts", ...configDefaults.exclude],
		coverage: {
			enabled: true,
			include: ["src/**/*.ts"],
			exclude: ["src/index.ts", "src/_internal.ts"],
		},
	},
	lint: {
		options: {
			typeAware: true,
			typeCheck: true,
		},
		jsPlugins: [
			{
				name: "vite-plus",
				specifier: "vite-plus/oxlint-plugin",
			},
		],
		rules: {
			"vite-plus/prefer-vite-plus-imports": "error",
		},
	},
	fmt: {
		tabWidth: 4,
		useTabs: true,
		overrides: [
			{
				files: ["*.yml", "*.yaml"],
				options: {
					tabWidth: 2,
					useTabs: false,
				},
			},
		],
	},
});
