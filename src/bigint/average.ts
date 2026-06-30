import { sum } from "./";

/**
 * Returns the average value of the elements in the {@link iterable}.
 *
 * @example
 * ```ts
 * import { average } from "c8n";
 *
 * const numbers = [1n, 2n, 3n, 4n, 5n];
 * const avg = average(numbers);
 *
 * console.log(avg);
 * // => 3n
 * ```
 */
export function average(iterable: Iterable<bigint>) {
	const array = [...iterable];

	return sum(array) / BigInt(array.length);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("average bigint", () => {
		expect(() => average([])).toThrow("zero");
		expect(average([1n, 2n, 3n, 4n, 5n])).toBe(3n);
		expect(average([1n, 2n, 3n, 4n, 5n].values())).toBe(3n);
	});
}
