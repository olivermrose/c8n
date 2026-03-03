import type { zip, zipLongest } from "./";
import type { Rest } from "./_internal";

/**
 * Produces a generator that yields pairs of corresponding elements from the
 * {@link iterables}.
 *
 * @throws {RangeError} Thrown if any {@link iterables} have different lengths at the point of yielding.
 *
 * @see {@link zip}
 * @see {@link zipLongest}
 *
 * @example
 * ```ts
 * import { zipStrict } from "c8n";
 *
 * const iter = zipStrict([1, 2, 3], ["a", "b", "c", "d"]);
 *
 * for (const element of iter) {
 * 	console.log(element);
 * }
 *
 * // => [1, "a"]
 * // => [2, "b"]
 * // => [3, "c"]
 * // => RangeError: 'iterables' must all have the same length
 * ```
 */
export function* zipStrict<T extends unknown[]>(...iterables: Rest<T>): Generator<T> {
	const iterators = iterables.map((iter) => iter[Symbol.iterator]());

	while (true) {
		const results = iterators.map((iter) => iter.next());

		if (results.every((r) => r.done)) {
			return;
		}

		if (results.some((r) => r.done)) {
			throw new RangeError("'iterables' must all have the same length");
		}

		yield results.map((r) => r.value) as T;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("zipExact", () => {
		const iter = zipStrict([1, 2, 3], ["a", "b", "c"]);

		expect(iter.next().value).toEqual([1, "a"]);
		expect(iter.next().value).toEqual([2, "b"]);
		expect(iter.next().value).toEqual([3, "c"]);
		expect(iter.next().done).toBe(true);
	});

	it("zipExact throws with different lengths", () => {
		const iter = zipStrict([1, 2, 3], ["a", "b", "c", "d"]);

		expect(iter.next().value).toEqual([1, "a"]);
		expect(iter.next().value).toEqual([2, "b"]);
		expect(iter.next().value).toEqual([3, "c"]);
		expect(() => iter.next()).toThrow("'iterables'");
	});
}
