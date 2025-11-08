import { Example } from "@sst-bun-monorepo/core/example";
// import { Resource } from "sst";

export default {
	async fetch(request: Request): Promise<Response> {
		console.log(
			"[api-fetch] x-amzn-function-arn:",
			request.headers.get("x-amzn-function-arn"),
		);

		// TODO: Figure out a way to make SST Resources available to the Lambda function.
		const message = `${Example.hello()} Work around to access SST Resources: ${process.env["BUCKET_NAME"]}.`;

		return new Response(message, {
			status: 200,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	},
};
