import { filter } from "./filter";
import { reject } from "./reject";

export type Partition<T, U extends T = T> = [filter: Generator<U>, reject: Generator<T>];

/**
 * Returns a pair of the generators from calling {@link filter} and
 * {@link reject} on the {@link iterable}.
 *
 * @see {@link filter}
 * @see {@link reject}
 *
 * @example
 * ```ts
 * import { partition } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const [even, odd] = partition(numbers, (x) => x % 2 === 0);
 *
 * console.log(even.toArray());
 * // => [2, 4]
 *
 * console.log(odd.toArray());
 * // => [1, 3, 5]
 * ```
 */
export function partition<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Partition<T>;

/**
 * Returns a pair of the generators from calling {@link filter} and
 * {@link reject} on the {@link iterable}.
 *
 * @see {@link filter}
 * @see {@link reject}
 *
 * @example
 * ```ts
 * import { partition } from "c8n";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const [even, odd] = partition(numbers, (x) => x % 2 === 0);
 *
 * console.log(even.toArray());
 * // => [2, 4]
 *
 * console.log(odd.toArray());
 * // => [1, 3, 5]
 * ```
 */
export function partition<T, U extends T>(
	iterable: Iterable<T>,
	predicate: (element: T) => element is U,
): Partition<T, U>;
export function partition<T>(
	iterable: Iterable<T>,
	predicate: (element: T) => boolean,
): Partition<T> {
	return [filter(iterable, predicate), reject(iterable, predicate)];
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("partition", () => {
		const numbers = [1, 2, 3, 4, 5];
		const [even, odd] = partition(numbers, (x) => x % 2 === 0);

		expect(even.next().value).toBe(2);
		expect(even.next().value).toBe(4);
		expect(even.next().done).toBe(true);

		expect(odd.next().value).toBe(1);
		expect(odd.next().value).toBe(3);
		expect(odd.next().value).toBe(5);
		expect(odd.next().done).toBe(true);
	});
}
