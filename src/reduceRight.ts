/**
 * Returns a single value by calling {@link operation} on every element in the
 * {@link iterable}, from right to left. The initial accumulator value is the
 * last element in the {@link iterable}.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @see {@link reduce}
 *
 * @example
 * ```ts
 * import { reduceRight } from "c8n";
 *
 * const result = reduceRight(["a", "b", "c"], (acc, val) => acc + val);
 *
 * console.log(result);
 * // => "cba"
 * ```
 */
export function reduceRight<T>(
	iterable: Iterable<T>,
	operation: (accumulator: T, value: T) => T,
): T;

/**
 * Returns a single value by calling {@link operation} on every element in the
 * {@link iterable}, from right to left. The {@link initialValue} is used as the
 * initial accumulator value.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty with no {@link initialValue}.
 *
 * @see {@link reduce}
 *
 * @example
 * ```ts
 * import { reduceRight } from "c8n";
 *
 * const result = reduceRight([1, 2, 3], (acc, val) => acc + val, 4);
 *
 * console.log(result);
 * // => 10
 * ```
 */
export function reduceRight<T, U>(
	iterable: Iterable<T>,
	operation: (accumulator: U, value: T) => U,
	initialValue: U,
): U;
export function reduceRight<T>(
	iterable: Iterable<T>,
	operation: (accumulator: T, value: T) => T,
	initialValue?: T,
): T {
	const array = [...iterable];

	let index = array.length - 1;
	let accumulator: T;

	if (initialValue !== undefined) {
		accumulator = initialValue;
	} else {
		if (index < 0) {
			throw new TypeError("Reduce of a done iterator with no initial value");
		}

		accumulator = array[index];
		index--;
	}

	for (; index >= 0; index--) {
		accumulator = operation(accumulator, array[index]);
	}

	return accumulator;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("reduceRight", () => {
		expect(reduceRight(["a", "b", "c"], (a, b) => a + b)).toBe("cba");
		expect(reduceRight([1, 2, 3], (a, b) => a + b, 4)).toBe(10);
	});

	it("reduceRight throws with empty iterable", () => {
		expect(() => reduceRight([], () => 0)).toThrow("done iterator");
		expect(() => reduceRight([], () => 0, 0)).not.toThrow("done iterator");
	});
}
