/**
 * Produces a generator that yields `[element, count]` tuples describing the
 * consecutive runs of equal elements in the {@link iterable}.
 *
 * Elements are compared using {@link Object.is}, so consecutive `NaN`s are
 * treated as a single run and `-0` is distinct from `+0`.
 *
 * @see {@link dedup}
 *
 * @example
 * ```ts
 * import { runLengthEncode } from "c8n";
 *
 * const iter = runLengthEncode("aaabbc");
 *
 * console.log(iter.toArray());
 * // => [["a", 3], ["b", 2], ["c", 1]]
 * ```
 */
export function* runLengthEncode<T>(iterable: Iterable<T>): Generator<[element: T, count: number]> {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	if (next.done) return;

	let current = next.value;
	let count = 1;

	next = iterator.next();

	while (!next.done) {
		if (Object.is(next.value, current)) {
			count++;
		} else {
			yield [current, count];

			current = next.value;
			count = 1;
		}

		next = iterator.next();
	}

	yield [current, count];
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("runLengthEncode", () => {
		expect(runLengthEncode("aaabbc").toArray()).toEqual([
			["a", 3],
			["b", 2],
			["c", 1],
		]);

		expect(runLengthEncode([]).next().done).toBe(true);
	});
}
