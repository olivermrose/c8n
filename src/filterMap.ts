import { filter, map } from "./";

/**
 * Produces a generator that yields the truthy values returned by calling
 * {@link transform} on every element in the {@link iterable}. This can be used
 * in place of calling {@link filter} and {@link map} separately.
 *
 * @see {@link filter}
 * @see {@link map}
 *
 * @example
 * ```ts
 * import { filterMap } from "c8n";
 *
 * const strings = ["1", "two", "NaN", "four", "5"];
 * const iter = filterMap(strings, (str) => parseInt(str));
 *
 * console.log(iter.toArray());
 * // => [1, 5]
 * ```
 *
 * @example
 * The same example using `filter` and `map`:
 *
 * ```ts
 * import { filter, map } from "c8n";
 *
 * const strings = ["1", "two", "NaN", "four", "5"];
 * const iter = map(
 * 	filter(strings, (str) => !isNaN(parseInt(str))),
 * 	(str) => parseInt(str)
 * );
 *
 * console.log(iter.toArray());
 * // => [1, 5]
 * ```
 */
export function* filterMap<T, U>(
	iterable: Iterable<T>,
	transform: (element: T) => U | null | undefined,
): Generator<U> {
	for (const element of iterable) {
		const value = transform(element);
		if (value) yield value;
	}
}

/* eslint-disable unicorn/prefer-number-properties */
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("filterMap", () => {
		const strings = ["1", "two", "NaN", "four", "5"];
		const iter1 = filterMap(strings, (str) => parseInt(str));
		const iter2 = map(
			filter(strings, (str) => !isNaN(parseInt(str))),
			(str) => parseInt(str),
		);

		expect(iter1.toArray()).toEqual([1, 5]);
		expect(iter2.toArray()).toEqual([1, 5]);
	});
}
