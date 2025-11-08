import { x64LayerArn } from "./lambda-layer";
import { bucket } from "./storage";

export const myApi = new sst.aws.Function("MyApi", {
	url: true,
	handler: "api.fetch",
	architecture: "x86_64",
	bundle: "packages/functions/dist",
	runtime: "provided.al2023",
	link: [bucket],
	layers: [x64LayerArn],
	environment: {
		BUCKET_NAME: bucket.name,
	},
});
