/**
 * Produces a generator that yields each intermediate accumulator value
 * produced by calling {@link operation} on every element in the
 * {@link iterable}. The initial accumulator value is the first element in the
 * {@link iterable}.
 *
 * Unlike {@link reduce}, which returns only the final accumulator, `scan`
 * yields every step. If the {@link iterable} is empty, nothing is yielded.
 *
 * @see {@link reduce}
 *
 * @example
 * ```ts
 * import { scan } from "c8n";
 *
 * const iter = scan([1, 2, 3, 4], (acc, val) => acc + val);
 *
 * console.log(iter.toArray());
 * // => [1, 3, 6, 10]
 * ```
 */
export function scan<T>(
	iterable: Iterable<T>,
	operation: (accumulator: T, value: T) => T,
): Generator<T>;

/**
 * Produces a generator that yields each intermediate accumulator value
 * produced by calling {@link operation} on every element in the
 * {@link iterable}. The {@link initialValue} is used as the initial accumulator
 * value and is yielded first.
 *
 * Unlike {@link reduce}, which returns only the final accumulator, `scan`
 * yields every step.
 *
 * @see {@link reduce}
 *
 * @example
 * ```ts
 * import { scan } from "c8n";
 *
 * const iter = scan([1, 2, 3], (acc, val) => acc + val, 10);
 *
 * console.log(iter.toArray());
 * // => [10, 11, 13, 16]
 * ```
 */
export function scan<T, U>(
	iterable: Iterable<T>,
	operation: (accumulator: U, value: T) => U,
	initialValue: U,
): Generator<U>;
export function* scan<T>(
	iterable: Iterable<T>,
	operation: (accumulator: T, value: T) => T,
	initialValue?: T,
): Generator<T> {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();
	let accumulator: T;

	if (initialValue !== undefined) {
		accumulator = initialValue;
	} else {
		if (next.done) return;

		accumulator = next.value;
		next = iterator.next();
	}

	yield accumulator;

	while (!next.done) {
		accumulator = operation(accumulator, next.value);
		yield accumulator;

		next = iterator.next();
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("scan", () => {
		expect(scan([1, 2, 3, 4], (a, b) => a + b).toArray()).toEqual([1, 3, 6, 10]);
		expect(scan([1, 2, 3], (a, b) => a + b, 10).toArray()).toEqual([10, 11, 13, 16]);
	});

	it("scan with empty iterable", () => {
		expect(scan<any>([], (a, b) => a + b).next().done).toBe(true);
		expect(scan<any, number>([], (a, b) => a + b, 10).toArray()).toEqual([10]);
	});
}
