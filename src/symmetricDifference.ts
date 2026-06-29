/**
 * Produces a generator that yields the distinct elements present in an odd
 * number of the inputs, computed by folding the symmetric difference across
 * {@link source} and each of {@link others} in order.
 *
 * @see {@link intersect}
 * @see {@link union}
 * @see {@link difference}
 *
 * @example
 * ```ts
 * import { symmetricDifference } from "c8n";
 *
 * const iter = symmetricDifference([1, 2, 3], [2, 3, 4]);
 *
 * console.log(iter.toArray());
 * // => [1, 4]
 * ```
 */
export function* symmetricDifference<T>(
	source: Iterable<T>,
	...others: Iterable<T>[]
): Generator<T> {
	let first = new Set(source);
	const sets = others.map((iter) => new Set(iter));

	for (const set of sets) {
		first = first.symmetricDifference(set);
	}

	for (const element of first) {
		yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("symmetricDifference", () => {
		expect(symmetricDifference([1, 2, 3], [2, 3, 4]).toArray()).toEqual([1, 4]);
		expect(symmetricDifference([1, 1, 2], [2, 2, 3], [3, 4, 5]).toArray()).toEqual([1, 4, 5]);

		expect(symmetricDifference([], []).next().done).toBe(true);
		expect(symmetricDifference([1, 2], []).toArray()).toEqual([1, 2]);
	});
}
