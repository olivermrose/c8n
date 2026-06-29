/**
 * Returns the smallest value returned by calling {@link selector} on every
 * element in the {@link iterable}. If the {@link iterable} is empty, returns
 * `NaN`.
 *
 * Unlike {@link minBy}, which returns the element, `minOf` returns the
 * transformed value.
 *
 * @see {@link min}
 * @see {@link minBy}
 *
 * @example
 * ```ts
 * import { minOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(minOf(names, (name) => name.length));
 * // => 3
 * ```
 */
export function minOf<T>(iterable: Iterable<T>, selector: (element: T) => bigint): bigint;

/**
 * Returns the smallest value returned by calling {@link selector} on every
 * element in the {@link iterable}. If the {@link iterable} is empty, returns
 * `NaN`.
 *
 * Unlike {@link minBy}, which returns the element, `minOf` returns the
 * transformed value.
 *
 * @see {@link min}
 * @see {@link minBy}
 *
 * @example
 * ```ts
 * import { minOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(minOf(names, (name) => name.length));
 * // => 3
 * ```
 */
export function minOf<T>(iterable: Iterable<T>, selector: (element: T) => number): number;
export function minOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint | number,
): bigint | number {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	if (next.done) return Number.NaN;

	let min = selector(next.value);
	next = iterator.next();

	while (!next.done) {
		const value = selector(next.value);
		if (Number.isNaN(value)) return Number.NaN;

		if (value < min) min = value;

		next = iterator.next();
	}

	return min;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("minOf", () => {
		const names = ["Alice", "Bob", "Charlie"];

		expect(minOf(names, (name) => name.length)).toBe(3);
		expect(minOf([1n, 5n, 2n], (x) => x * 2n)).toBe(2n);

		expect(minOf([], (x) => x)).toBeNaN();
	});
}
