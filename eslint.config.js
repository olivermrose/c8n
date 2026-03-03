import config from "@antfu/eslint-config";
import prettier from "eslint-config-prettier";

export default config({
	stylistic: false,
	rules: {
		curly: "off",
		"antfu/no-top-level-await": "off",
		"no-console": "off",
		"import/order": "off",
		"jsdoc/sort-tags": [
			"error",
			{
				tagSequence: [
					{ tags: ["param", "returns", "throws"] },
					{ tags: ["see"] },
					{ tags: ["example"] },
				],
				reportIntraTagGroupSpacing: false,
			},
		],
		"jsonc/sort-keys": "off",
		"ts/ban-ts-comment": "off",
		"ts/prefer-ts-expect-error": "off",
	},
}).append(prettier);
