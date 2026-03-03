import type { combinations, permutations } from "./";
import type { Rest } from "./_internal";

/**
 * Produces a generator that yields the Cartesian product of the
 * {@link iterables}.
 *
 * @see {@link combinations}
 * @see {@link permutations}
 *
 * @example
 * ```ts
 * import { crossJoin } from "c8n";
 *
 * const iter = crossJoin([1, 2], "ab");
 *
 * for (const product of iter) {
 * 	console.log(product);
 * }
 *
 * // => [1, "a"]
 * // => [1, "b"]
 * // => [2, "a"]
 * // => [2, "b"]
 * ```
 */
export function* crossJoin<T extends unknown[]>(...iterables: Rest<T>): Generator<T> {
	if (iterables.length === 0) return;

	function* product(current: T[], i = 0): Generator<T> {
		if (i === iterables.length) {
			yield current as T;
			return;
		}

		for (const value of iterables[i]) {
			yield* product([...current, value as T], i + 1);
		}
	}

	yield* product([]);
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("crossJoin", () => {
		const product = crossJoin([1, 2], "ab");

		expect(product.next().value).toEqual([1, "a"]);
		expect(product.next().value).toEqual([1, "b"]);
		expect(product.next().value).toEqual([2, "a"]);
		expect(product.next().value).toEqual([2, "b"]);
		expect(product.next().done).toBe(true);

		expect(crossJoin().next().done).toBe(true);
	});
}
