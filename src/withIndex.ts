export type WithIndex<T> = Generator<[element: T, index: number]>;

/**
 * Produces a generator that yields a pair of the element and its index in the
 * {@link iterable}.
 *
 * @example
 * ```ts
 * import { withIndex } from "c8n";
 *
 * const pairs = withIndex("abc");
 *
 * for (const pair of pairs) {
 * 	console.log(pair);
 * }
 *
 * // => ["a", 0]
 * // => ["b", 1]
 * // => ["c", 2]
 * ```
 */
export function* withIndex<T>(iterable: Iterable<T>): WithIndex<T> {
	let index = 0;

	for (const element of iterable) {
		yield [element, index++];
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("withIndex", () => {
		const iter = withIndex("abc");

		expect(iter.next().value).toEqual(["a", 0]);
		expect(iter.next().value).toEqual(["b", 1]);
		expect(iter.next().value).toEqual(["c", 2]);
		expect(iter.next().done).toBe(true);
	});
}
