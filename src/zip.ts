import type { zipLongest, zipStrict } from "./";
import type { Rest } from "./_internal";

/**
 * Produces a generator that yields pairs of corresponding elements from the
 * {@link iterables}.
 *
 * If the {@link iterables} have different lengths, the shortest iterable is
 * used to determine the length of each pair.
 *
 * @see {@link zipLongest}
 * @see {@link zipStrict}
 *
 * @example
 * ```ts
 * import { zip } from "c8n";
 *
 * const iter = zip([1, 2, 3], ["a", "b", "c", "d"]);
 *
 * for (const element of iter) {
 * 	console.log(element);
 * }
 *
 * // => [1, "a"]
 * // => [2, "b"]
 * // => [3, "c"]
 * ```
 *
 * @example
 * Converting an infinite generator to a finite one:
 *
 * ```ts
 * import { zip } from "c8n";
 *
 * function* naturals() {
 * 	for (let i = 0; ; i++) yield i;
 * }
 *
 * const iter = zip(naturals(), "hello");
 *
 * for (const element of iter) {
 * 	console.log(element);
 * }
 *
 * // => [0, "h"]
 * // => [1, "e"]
 * // => [2, "l"]
 * // => [3, "l"]
 * // => [4, "o"]
 * ```
 */
export function* zip<T extends unknown[]>(...iterables: Rest<T>): Generator<T> {
	const iterators = iterables.map((iter) => iter[Symbol.iterator]());

	while (true) {
		const results = iterators.map((iter) => iter.next());

		if (results.some((r) => r.done)) {
			return;
		}

		yield results.map((r) => r.value) as T;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("zip", () => {
		const iter = zip([1, 2, 3], ["a", "b", "c", "d"]);

		expect(iter.next().value).toEqual([1, "a"]);
		expect(iter.next().value).toEqual([2, "b"]);
		expect(iter.next().value).toEqual([3, "c"]);
		expect(iter.next().done).toBe(true);
	});

	it("zip with infinite", () => {
		function* naturals() {
			/* v8 ignore next */
			for (let i = 0; ; i++) yield i;
		}

		const iter = zip(naturals(), "hello");

		expect(iter.next().value).toEqual([0, "h"]);
		expect(iter.next().value).toEqual([1, "e"]);
		expect(iter.next().value).toEqual([2, "l"]);
		expect(iter.next().value).toEqual([3, "l"]);
		expect(iter.next().value).toEqual([4, "o"]);
		expect(iter.next().done).toBe(true);
	});
}
