import { Example } from "@sst-bun-monorepo/core/example";
import { Resource } from "sst";

export default {
	async fetch(request: Request): Promise<Response> {
		console.log(
			"[api-fetch] x-amzn-function-arn:",
			request.headers.get("x-amzn-function-arn"),
		);

		const message = `${Example.hello()} Linked to ${Resource.MyBucket.name}.`;

		return new Response(message, {
			status: 200,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	},
};
