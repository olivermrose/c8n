/**
 * Returns the most frequently occurring element in the {@link iterable}. If
 * multiple elements share the highest frequency, the one that reaches it first
 * is returned. If the {@link iterable} is empty, returns `undefined`.
 *
 * @see {@link countBy}
 *
 * @example
 * ```ts
 * import { mode } from "c8n";
 *
 * console.log(mode([1, 2, 2, 3, 3, 3]));
 * // => 3
 * ```
 */
export function mode<T>(iterable: Iterable<T>): T | undefined {
	const counts = new Map<T, number>();

	let mode: T | undefined;
	let max = 0;

	for (const element of iterable) {
		const count = (counts.get(element) ?? 0) + 1;
		counts.set(element, count);

		if (count > max) {
			max = count;
			mode = element;
		}
	}

	return mode;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("mode", () => {
		expect(mode([1, 2, 2, 3, 3, 3])).toBe(3);
		expect(mode(["a", "b", "a"])).toBe("a");
		expect(mode([1, 1, 2, 2])).toBe(1);
		expect(mode([])).toBeUndefined();
	});
}
