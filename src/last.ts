/**
 * Returns the last element in the {@link iterable} or `undefined` if it is
 * empty.
 *
 * @see {@link first}
 *
 * @example
 * ```ts
 * import { last } from "c8n";
 *
 * const numbers = new Set([1, 2, 3, 4, 5]);
 *
 * console.log(last(numbers));
 * // => 5
 * ```
 */
export function last<T>(iterable: Iterable<T>): T | undefined {
	if (Array.isArray(iterable)) {
		return iterable[iterable.length - 1];
	}

	let last: T | undefined;

	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	if (next.done) return last;

	while (!next.done) {
		last = next.value;
		next = iterator.next();
	}

	return last;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("last", () => {
		const numbers = new Set([1, 2, 3, 4, 5]);

		expect(last(numbers)).toBe(5);
		expect(last([1, 2, 3])).toBe(3);
		expect(last([])).toBeUndefined();
		expect(last(new Set<number>())).toBeUndefined();
	});
}
