import { dropWhile, takeWhile } from "./";

export type Span<T> = [takeWhile: Generator<T>, dropWhile: Generator<T>];

/**
 * Returns a pair of generators splitting the {@link iterable} at the first
 * element that does not satisfy the {@link predicate}. The first generator
 * yields the leading run of elements that satisfy the {@link predicate} and the
 * second yields the rest.
 *
 * This is equivalent to calling {@link takeWhile} and {@link dropWhile} with
 * the same {@link predicate}.
 *
 * @see {@link splitAt}
 * @see {@link partition}
 * @see {@link takeWhile}
 * @see {@link dropWhile}
 *
 * @example
 * ```ts
 * import { span } from "c8n";
 *
 * const [leading, rest] = span([1, 2, 3, 4, 1], (x) => x < 3);
 *
 * console.log(leading.toArray());
 * // => [1, 2]
 *
 * console.log(rest.toArray());
 * // => [3, 4, 1]
 * ```
 */
export function span<T>(iterable: Iterable<T>, predicate: (element: T) => boolean): Span<T> {
	return [takeWhile(iterable, predicate), dropWhile(iterable, predicate)];
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("span", () => {
		const [leading, rest] = span([1, 2, 3, 4, 1], (x) => x < 3);

		expect(leading.toArray()).toEqual([1, 2]);
		expect(rest.toArray()).toEqual([3, 4, 1]);
	});
}
