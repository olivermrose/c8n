/**
 * Produces a generator that yields the distinct elements from {@link source}
 * that are present in each of the {@link others}.
 *
 * @see {@link union}
 * @see {@link difference}
 * @see {@link symmetricDifference}
 *
 * @example
 * ```ts
 * import { intersect } from "c8n";
 *
 * const iter = intersect([1, 2, 2, 3], [5, 2, 3, 9]);
 *
 * console.log(iter.toArray());
 * // => [2, 3]
 * ```
 */
export function* intersect<T>(source: Iterable<T>, ...others: Iterable<T>[]): Generator<T> {
	const sets = others.map((iter) => new Set(iter));
	const seen = new Set<T>();

	for (const element of source) {
		if (!seen.has(element) && sets.every((set) => set.has(element))) {
			seen.add(element);
			yield element;
		}
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("intersect", () => {
		const iter = intersect([1, 2, 2, 3], [5, 2, 3, 9]);

		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().done).toBe(true);

		expect(intersect([]).next().done).toBe(true);
		expect(intersect([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
	});
}
