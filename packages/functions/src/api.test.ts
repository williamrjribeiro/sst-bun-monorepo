import { expect, mock, test } from "bun:test";
import type { Context } from "aws-lambda";

// Mock SST Resource before importing the handler
// Or use SST Shell command: https://sst.dev/docs/reference/cli#shell
mock.module("sst", () => ({
	Resource: {
		MyBucket: {
			name: "MockedMyBucket",
		},
	},
}));

const { handler } = await import("./api");

test("handler test", async () => {
	const { statusCode, body } = await handler({}, {} as Context, () => {});

	expect(statusCode).toBe(200);
	expect(body).toEqual("Hello, world! Linked to MockedMyBucket.");
});
