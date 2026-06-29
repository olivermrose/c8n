/**
 * Produces a generator that yields the distinct elements from {@link source}
 * that are not present in any of the {@link others}, in the order they are
 * first encountered.
 *
 * @see {@link intersect}
 * @see {@link union}
 * @see {@link symmetricDifference}
 *
 * @example
 * ```ts
 * import { difference } from "c8n";
 *
 * const iter = difference([1, 2, 3, 4], [2, 4], [3]);
 *
 * console.log(iter.toArray());
 * // => [1]
 * ```
 */
export function* difference<T>(source: Iterable<T>, ...others: Iterable<T>[]): Generator<T> {
	let first = new Set(source);
	const sets = others.map((iter) => new Set(iter));

	for (const set of sets) {
		first = first.difference(set);
	}

	for (const element of first) {
		yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("difference", () => {
		expect(difference([1, 2, 3, 4], [2, 4], [3]).toArray()).toEqual([1]);
		expect(difference([1, 1, 2, 3], [3]).toArray()).toEqual([1, 2]);

		expect(difference([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
		expect(difference([]).next().done).toBe(true);
	});
}
