/**
 * Produces a generator that yields the elements of the {@link iterable}
 * unchanged, calling {@link callback} on each one as it passes through.
 *
 * Useful for running a side effect, such as logging, in the middle of a lazy
 * pipeline without consuming it.
 *
 * @see {@link forEach}
 *
 * @example
 * ```ts
 * import { tap } from "c8n";
 *
 * const iter = tap([1, 2, 3], (x) => console.log(`saw ${x}`));
 *
 * console.log(iter.toArray());
 * // => saw 1
 * // => saw 2
 * // => saw 3
 * // => [1, 2, 3]
 * ```
 */
export function* tap<T>(iterable: Iterable<T>, callback: (element: T) => void): Generator<T> {
	for (const element of iterable) {
		callback(element);
		yield element;
	}
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("tap", () => {
		const seen: number[] = [];
		const iter = tap([1, 2, 3], (x) => seen.push(x));

		expect(iter.toArray()).toEqual([1, 2, 3]);
		expect(seen).toEqual([1, 2, 3]);
	});

	it("tap is lazy", () => {
		const seen: number[] = [];
		const iter = tap([1, 2, 3], (x) => seen.push(x));

		iter.next();
		expect(seen).toEqual([1]);
	});
}
