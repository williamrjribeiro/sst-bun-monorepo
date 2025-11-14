import { Example } from "@sst-bun-monorepo/core/example";
import { Resource } from "sst";

export default {
	async fetch(request: Request): Promise<Response> {
		try {
			console.log(
				"[api-fetch] x-amzn-function-arn:",
				request.headers.get("x-amzn-function-arn"),
			);

			const message = `${Example.hello()} Work around to access SST Resources: ${Resource.MyBucket.name}.`;

			return new Response(message, {
				status: 200,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			console.error(`[api-fetch]`, { errorMessage, error });

			return new Response(errorMessage, {
				status: 500,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		}
	},
};
