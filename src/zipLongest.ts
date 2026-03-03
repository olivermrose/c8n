import type { zip, zipStrict } from "./";
import type { Rest } from "./_internal";

/**
 * Produces a generator that yields pairs of corresponding elements from the
 * {@link iterables}.
 *
 * If the {@link iterables} have different lengths, iterables shorter than the
 * longest iterable will be padded with `undefined`.
 *
 * @see {@link zip}
 * @see {@link zipStrict}
 *
 * @example
 * ```ts
 * import { zipLongest } from "c8n";
 *
 * const iter = zipLongest([1, 2, 3], ["a", "b", "c", "d"]);
 *
 * for (const element of iter) {
 * 	console.log(element);
 * }
 *
 * // => [1, "a"]
 * // => [2, "b"]
 * // => [3, "c"]
 * // => [undefined, "d"]
 * ```
 */
export function* zipLongest<T extends unknown[]>(...iterables: Rest<T>): Generator<T> {
	const iterators = iterables.map((iter) => iter[Symbol.iterator]());

	while (true) {
		const results = iterators.map((iter) => iter.next());

		if (results.every((r) => r.done)) {
			return;
		}

		yield results.map((r) => r.value) as T;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("zipLongest", () => {
		const iter = zipLongest([1, 2, 3], ["a", "b", "c", "d"]);

		expect(iter.next().value).toEqual([1, "a"]);
		expect(iter.next().value).toEqual([2, "b"]);
		expect(iter.next().value).toEqual([3, "c"]);
		expect(iter.next().value).toEqual([undefined, "d"]);
		expect(iter.next().done).toBe(true);
	});
}
