import { sumOf } from "./";

/**
 * Returns the sum of the elements in the {@link iterable}.
 *
 * @see {@link sumOf}
 *
 * @example
 * ```ts
 * import { sum } from "c8n";
 *
 * console.log(sum([1n, 2n, 3n]));
 * // => 6n
 * ```
 */
export function sum(iterable: Iterable<bigint>): bigint {
	return sumOf(iterable, (element) => element);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("sum bigint", () => {
		expect(sum([])).toBe(0n);
		expect(sum([1n, 2n, 3n])).toBe(6n);
		expect(sum([1n, 2n, 3n].values())).toBe(6n);
	});
}
