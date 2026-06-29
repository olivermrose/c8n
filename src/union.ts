/**
 * Produces a generator that yields the distinct elements present in any of the
 * {@link iterables}, in the order they are first encountered.
 *
 * @see {@link intersect}
 * @see {@link difference}
 * @see {@link symmetricDifference}
 *
 * @example
 * ```ts
 * import { union } from "c8n";
 *
 * const iter = union([1, 2, 3], [3, 4, 5]);
 *
 * console.log(iter.toArray());
 * // => [1, 2, 3, 4, 5]
 * ```
 */
export function* union<T>(...iterables: Iterable<T>[]): Generator<T> {
	const seen = new Set<T>();

	for (const iter of iterables) {
		for (const element of iter) {
			if (!seen.has(element)) {
				seen.add(element);
				yield element;
			}
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("union", () => {
		expect(union([1, 2, 3], [3, 4, 5]).toArray()).toEqual([1, 2, 3, 4, 5]);
		expect(union([1, 1, 2], [2, 2, 3]).toArray()).toEqual([1, 2, 3]);

		expect(union().next().done).toBe(true);
		expect(union([]).next().done).toBe(true);
	});
}
