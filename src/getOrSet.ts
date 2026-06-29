/**
 * Returns the value associated with the {@link key} if it exists in the
 * {@link map}; otherwise, inserts the {@link key} with {@link defaultValue}.
 *
 * The default value is evaluated regardless of whether the {@link key} exists;
 * for lazy behavior, use {@link getOrSetWith}.
 *
 * @see {@link getOrSetWith}
 *
 * @example
 * ```ts
 * import { getOrSet } from "c8n";
 *
 * const map = new Map<string, number[]>();
 * getOrSet(map, "foo", []).push(42);
 *
 * console.log(map.get("foo"));
 * // => [42]
 * ```
 */
export function getOrSet<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
	if (map.getOrInsert) {
		return map.getOrInsert(key, defaultValue);
	}

	if (map.has(key)) {
		return map.get(key)!;
	}

	map.set(key, defaultValue);
	return map.get(key)!;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("getOrSet", () => {
		const map = new Map<string, number[]>();
		getOrSet(map, "foo", []).push(42);

		expect(map.get("foo")).toEqual([42]);
	});

	it("getOrSet with existing key", () => {
		const map = new Map<string, number>([["foo", 3]]);
		getOrSet(map, "foo", 4);

		expect(map.get("foo")).toEqual(3);
	});
}
