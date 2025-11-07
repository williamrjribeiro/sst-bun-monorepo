import { expect, test } from "bun:test";
import { Example } from ".";

test("Hello test", () => {
	const expected = "Hello, world!";

	expect(Example.hello()).toEqual(expected);
});
