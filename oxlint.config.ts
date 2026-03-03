import { defineConfig } from "oxlint";

export default defineConfig({
	plugins: ["eslint", "jsdoc", "oxc", "typescript", "unicorn", "vitest"],
	rules: {
		"no-unused-vars": "off",
		"jsdoc/require-yields": "off",
	},
	options: {
		typeCheck: true,
		typeAware: true,
	},
});
