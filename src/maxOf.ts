/**
 * Returns the largest value returned by calling {@link selector} on every
 * element in the {@link iterable}. If the {@link iterable} is empty, returns
 * `NaN`.
 *
 * Unlike {@link maxBy}, which returns the element, `maxOf` returns the
 * transformed value.
 *
 * @see {@link max}
 * @see {@link maxBy}
 *
 * @example
 * ```ts
 * import { maxOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(maxOf(names, (name) => name.length));
 * // => 7
 * ```
 */
export function maxOf<T>(iterable: Iterable<T>, selector: (element: T) => bigint): bigint;

/**
 * Returns the largest value returned by calling {@link selector} on every
 * element in the {@link iterable}. If the {@link iterable} is empty, returns
 * `NaN`.
 *
 * Unlike {@link maxBy}, which returns the element, `maxOf` returns the
 * transformed value.
 *
 * @see {@link max}
 * @see {@link maxBy}
 *
 * @example
 * ```ts
 * import { maxOf } from "c8n";
 *
 * const names = ["Alice", "Bob", "Charlie"];
 *
 * console.log(maxOf(names, (name) => name.length));
 * // => 7
 * ```
 */
export function maxOf<T>(iterable: Iterable<T>, selector: (element: T) => number): number;
export function maxOf<T>(
	iterable: Iterable<T>,
	selector: (element: T) => bigint | number,
): bigint | number {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	if (next.done) return Number.NaN;

	let max = selector(next.value);
	next = iterator.next();

	while (!next.done) {
		const value = selector(next.value);
		if (Number.isNaN(value)) return Number.NaN;

		if (value > max) max = value;

		next = iterator.next();
	}

	return max;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("maxOf", () => {
		const names = ["Alice", "Bob", "Charlie"];

		expect(maxOf(names, (name) => name.length)).toBe(7);
		expect(maxOf([1n, 5n, 2n], (x) => x * 2n)).toBe(10n);

		expect(maxOf([], (x) => x)).toBeNaN();
	});
}
