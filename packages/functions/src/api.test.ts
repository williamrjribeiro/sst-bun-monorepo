import { expect, mock, test } from "bun:test";

// Mock SST Resource before importing the handler
// Or use SST Shell command: https://sst.dev/docs/reference/cli#shell
mock.module("sst", () => ({
	Resource: {
		MyBucket: {
			name: "MockedMyBucket",
		},
	},
}));

const { default: handler } = await import("./api");

test("handler test", async () => {
	const response = await handler.fetch(new Request("http://localhost"));

	expect(response.status).toBe(200);
	expect(await response.text()).toEqual(
		"Hello, world! Linked to MockedMyBucket.",
	);
});
