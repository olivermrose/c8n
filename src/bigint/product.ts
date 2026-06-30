import { productOf } from "./";

/**
 * Returns the product of the elements in the {@link iterable}.
 *
 * @see {@link productOf}
 *
 * @example
 * ```ts
 * import { product } from "c8n";
 *
 * console.log(product([2n, 4n, 6n]));
 * // => 48n
 * ```
 */
export function product(iterable: Iterable<bigint>): bigint {
	return productOf(iterable, (element) => element);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("product bigint", () => {
		expect(product([])).toBe(0n);
		expect(product([2n, 4n, 6n])).toBe(48n);
		expect(product([2n, 4n, 6n].values())).toBe(48n);
	});
}
