import { drop, take } from "./";

export type SplitAt<T> = [take: Generator<T>, drop: Generator<T>];

/**
 * Returns a pair of generators splitting the {@link iterable} at the given
 * {@link index}. The first generator yields the elements before {@link index}
 * and the second yields the rest.
 *
 * This is equivalent to calling {@link take} and {@link drop} with the same
 * {@link index}.
 *
 * @see {@link span}
 * @see {@link take}
 * @see {@link drop}
 *
 * @example
 * ```ts
 * import { splitAt } from "c8n";
 *
 * const [before, after] = splitAt([1, 2, 3, 4, 5], 2);
 *
 * console.log(before.toArray());
 * // => [1, 2]
 *
 * console.log(after.toArray());
 * // => [3, 4, 5]
 * ```
 */
export function splitAt<T>(iterable: Iterable<T>, index: number): SplitAt<T> {
	return [take(iterable, index), drop(iterable, index)];
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("splitAt", () => {
		const [before, after] = splitAt([1, 2, 3, 4, 5], 2);

		expect(before.toArray()).toEqual([1, 2]);
		expect(after.toArray()).toEqual([3, 4, 5]);
	});
}
