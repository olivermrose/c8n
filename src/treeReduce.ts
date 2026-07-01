/**
 * Returns a single value by combining the elements of the {@link iterable} with
 * {@link operation} in a balanced binary tree, rather than left-to-right as
 * {@link reduce} does.
 *
 * Adjacent elements are combined pairwise, then the results are combined
 * pairwise, and so on, until a single value remains. This keeps the depth of
 * nested {@link operation} calls logarithmic in the number of elements, which is
 * useful for operations where a balanced combination order matters, such as
 * floating point summation or building balanced expression trees.
 *
 * @throws {TypeError} Thrown if the {@link iterable} is empty.
 *
 * @example
 * ```ts
 * import { treeReduce } from "c8n";
 *
 * const sum = treeReduce([1, 2, 3, 4, 5], (a, b) => a + b);
 *
 * console.log(sum);
 * // => 15
 * ```
 *
 * @example
 * ```ts
 * import { treeReduce } from "c8n";
 *
 * const expr = treeReduce(["a", "b", "c", "d"], (a, b) => `(${a} ${b})`);
 *
 * console.log(expr);
 * // => "((a b) (c d))"
 * ```
 */
export function treeReduce<T>(iterable: Iterable<T>, operation: (a: T, b: T) => T): T {
	const iterator = iterable[Symbol.iterator]();

	let next = iterator.next();

	if (next.done) {
		throw new TypeError("Tree reduce of a done iterator");
	}

	// A stack of partial results, where the entry at index `i` (when present)
	// holds a value combined from exactly 2 ** i elements. Combining two entries
	// of equal size produces an entry of the next size up, mirroring the carry
	// behaviour of binary addition and keeping the combination tree balanced.
	const stack: (T | undefined)[] = [];

	while (!next.done) {
		let value = next.value;

		for (let i = 0; i < stack.length; i++) {
			const pending = stack[i];

			if (pending === undefined) {
				stack[i] = value;
				value = undefined as unknown as T;
				break;
			}

			value = operation(pending, value);
			stack[i] = undefined;
		}

		if (value !== undefined) {
			stack.push(value);
		}

		next = iterator.next();
	}

	// Collapse any remaining partial results from smallest to largest so the
	// final combination order stays balanced.
	let accumulator: T | undefined;

	for (const pending of stack) {
		if (pending === undefined) {
			continue;
		}

		accumulator = accumulator === undefined ? pending : operation(pending, accumulator);
	}

	return accumulator as T;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("treeReduce", () => {
		expect(treeReduce([1, 2, 3, 4, 5], (a, b) => a + b)).toBe(15);
		expect(treeReduce([42], (a, b) => a + b)).toBe(42);
	});

	it("treeReduce combines in a balanced order", () => {
		expect(treeReduce(["a", "b", "c", "d"], (a, b) => `(${a} ${b})`)).toBe("((a b) (c d))");
	});

	it("treeReduce throws with empty iterable", () => {
		expect(() => treeReduce([], () => 0)).toThrow("done iterator");
	});
}
