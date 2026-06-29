/**
 * Returns the median value of the elements in the {@link iterable}. If the
 * {@link iterable} has an even number of elements, the median is the average of
 * the two middle values. If the {@link iterable} is empty, returns `NaN`.
 *
 * @see {@link average}
 *
 * @example
 * ```ts
 * import { median } from "c8n";
 *
 * console.log(median([1n, 5n, 2n, 8n]));
 * // => 3n
 * ```
 */
export function median(iterable: Iterable<bigint>): bigint;

/**
 * Returns the median value of the elements in the {@link iterable}. If the
 * {@link iterable} has an even number of elements, the median is the average of
 * the two middle values. If the {@link iterable} is empty, returns `NaN`.
 *
 * @see {@link average}
 *
 * @example
 * ```ts
 * import { median } from "c8n";
 *
 * console.log(median([1, 5, 2, 8]));
 * // => 3.5
 * ```
 */
export function median(iterable: Iterable<number>): number;
export function median(iterable: Iterable<bigint | number>): bigint | number {
	const sorted = [...iterable].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

	if (sorted.length === 0) {
		return Number.NaN;
	}

	const mid = sorted.length >> 1;

	if (sorted.length % 2 === 1) {
		return sorted[mid];
	}

	const a = sorted[mid - 1];
	const b = sorted[mid];

	// @ts-expect-error - a and b are guaranteed to share the same numeric type
	return typeof a === "bigint" ? (a + b) / 2n : (a + b) / 2;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("median", () => {
		expect(median([5, 1, 2])).toBe(2);
		expect(median([5n, 1n, 2n])).toBe(2n);
		expect(median([1, 5, 2, 8])).toBe(3.5);
		expect(median([1n, 5n, 2n, 8n])).toBe(3n);
		expect(median([])).toBeNaN();
	});
}
