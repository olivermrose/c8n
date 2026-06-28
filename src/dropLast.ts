import { take } from "./";

/**
 * Produces a generator that yields the elements from the {@link iterable}
 * except the last {@link count} elements.
 *
 * @throws {RangeError} Thrown if {@link count} is `NaN` or negative.
 *
 * @see {@link dropLastWhile}
 * @see {@link drop}
 * @see {@link dropWhile}
 *
 * @example
 * ```ts
 * import { dropLast } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const iter = dropLast(numbers, 2);
 *
 * console.log(iter.toArray());
 * // => [1, 2, 3]
 * ```
 */
export function* dropLast<T>(iterable: Iterable<T>, count: number): Generator<T> {
	if (count < 0) {
		throw new RangeError("'count' must be positive");
	}

	const array = Array.isArray(iterable) ? iterable : Array.from(iterable);
	yield* take(array, Math.max(array.length - count, 0));
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("dropLast", () => {
		const numbers = [1, 2, 3, 4, 5];
		const iter = dropLast(numbers, 2);

		expect(iter.next().value).toBe(1);
		expect(iter.next().value).toBe(2);
		expect(iter.next().value).toBe(3);
		expect(iter.next().done).toBe(true);
	});

	it("dropLast with a non-array iterable", () => {
		expect(dropLast(new Set([1, 2, 3, 4, 5]), 2).toArray()).toEqual([1, 2, 3]);
	});

	it("dropLast throws with negative count", () => {
		expect(() => dropLast([], -1).toArray()).toThrow("'count'");
	});
}
