/**
 * Returns the value associated with the {@link key} if it exists in the
 * {@link map}; otherwise, inserts the {@link key} with the result of calling
 * {@link defaultValue}.
 *
 * The default value is only evaluated if the {@link key} does not exist; for
 * eager behavior, use {@link getOrSet}.
 *
 * @see {@link getOrSet}
 *
 * @example
 * ```ts
 * import { getOrSetWith } from "c8n";
 *
 * const map = new Map<string, number>();
 * getOrSetWith(map, "foo", (key) => key.length);
 *
 * console.log(map.get("foo"));
 * // => 3
 * ```
 */
export function getOrSetWith<K, V>(map: Map<K, V>, key: K, defaultValue: (key: K) => V): V {
	if (map.getOrInsertComputed) {
		return map.getOrInsertComputed(key, defaultValue);
	}

	if (map.has(key)) {
		return map.get(key)!;
	}

	map.set(key, defaultValue(key));
	return map.get(key)!;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it("getOrSetWith", () => {
		const map = new Map<string, number>();
		getOrSetWith(map, "foo", (key) => key.length);

		expect(map.get("foo")).toEqual(3);
	});

	it("getOrSetWith with existing key", () => {
		const map = new Map<string, number>([["foo", 3]]);
		getOrSetWith(map, "foo", () => 4);

		expect(map.get("foo")).toEqual(3);
	});
}
